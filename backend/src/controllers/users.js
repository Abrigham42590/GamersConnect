import pool from '../db/index.js';
import supabase from '../db/supabase.js'; // Use ES6 import syntax
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async res => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const loginUser = async (req, res) => {
  const {username, password} = req.body;
  try {
    // Check if the user exists
    const result = await pool.query(
      'SELECT * FROM users_table WHERE username = $1',
      [username],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // Generate a token (JWT)
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send back the userId and token
    res.json({userId: user.id, token});
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addUser = async (req, res) => {
  const {username, email, password, profile_pic} = req.body;

  try {
    // Check if the username or email already exists in the database
    const userCheck = await pool.query(
      'SELECT * FROM users_table WHERE username = $1 OR email = $2',
      [username, email],
    );

    if (userCheck.rows.length > 0) {
      // If a user with the same username or email exists, send a 400 error
      return res.status(400).json({error: 'Username or email already exists'});
    }

    // Hash the password before storing it
    const password_hash = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users_table (username, password_hash, email, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password_hash, email, profile_pic],
    );

    // Respond with the newly created user (excluding sensitive fields if needed)
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const getFriends = async res => {
  try {
    const result = await pool.query('SELECT * FROM friends_list');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addFriends = async (req, res) => {
  const {friend_first_and_last_name, status} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO friends_list (friends_first_and_last_name, status) VALUES($1, $2) RETURNING *',
      [friend_first_and_last_name, status],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const getGamingReviewSites = async res => {
  try {
    const result = await pool.query('SELECT * FROM gaming_reviews_sites');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addGamingReviewSites = async (req, res) => {
  const {site_name, site_url} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gaming_review_sites (site_name, site_url) VALUES($1, $2) RETURNING *',
      [site_name, site_url],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const getProfilePic = async res => {
  try {
    const result = await pool.query('SELECT * FROM profile_pic');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addProfilePic = async (req, res) => {
  const {profile_pic_url} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO profile_pic (profile_pic_url) VALUES($1) RETURNING *',
      [profile_pic_url],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const getUserMedia = async (req, res) => {
  const {userId} = req.params; // Extract userId from request parameters

  try {
    // Ensure the authenticated user is accessing their own media
    if (req.user.userId !== userId) {
      console.error(userId);
      console.error('Unauthorized access attempt by user:', req.user.id);
      return res.status(403).json({error: 'Unauthorized access'});
    }

    // Query to fetch media specific to the userId
    const result = await pool.query(
      'SELECT * FROM user_media WHERE user_id = $1',
      [userId],
    );

    // Return the user's media
    res.json({media: result.rows});
  } catch (err) {
    console.error('Error fetching user media:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addUserMedia = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the userId correctly
    const mediaFile = req.file; // `multer` should populate this

    console.log('Received file:', mediaFile);
    console.log('Received userId:', userId);

    if (!userId) {
      return res.status(400).json({error: 'User ID is required'});
    }

    if (!mediaFile) {
      return res.status(400).json({error: 'No file uploaded'});
    }

    // Generate a unique file name to prevent duplicates
    const uniqueFileName = `${Date.now()}_${mediaFile.originalname}`;

    // 1. Upload the media file to the Supabase storage bucket
    const {data: uploadData, error: uploadError} = await supabase.storage
      .from('user_media')
      .upload(`${userId}/${uniqueFileName}`, mediaFile.buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).json({error: 'Error uploading file to storage'});
    }

    // 2. Get the public URL of the uploaded file
    const {data: urlData, error: urlError} = supabase.storage
      .from('user_media')
      .getPublicUrl(`${userId}/${uniqueFileName}`);

    const publicURL = urlData.publicUrl;

    if (urlError) {
      console.error('Error generating public URL:', urlError);
      return res.status(500).json({error: 'Error generating public URL'});
    }

    if (!publicURL) {
      console.error('Public URL is undefined');
      return res.status(500).json({error: 'Public URL could not be generated'});
    }

    console.log('publicURL:', publicURL);

    // 3. Store the media URL and type in the PostgreSQL database
    const result = await pool.query(
      'INSERT INTO user_media (user_id, media_url, media_type) VALUES($1, $2, $3) RETURNING *',
      [userId, publicURL, mediaFile.mimetype],
    );
    console.log('Database insertion result:', result.rows[0]);

    res.json(result.rows[0]); // Return the newly created media record
  } catch (err) {
    console.error('Error in addUserMedia:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const getEsportsEvents = async res => {
  try {
    const result = await pool.query('SELECT * FROM esports_events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addEsportsEvents = async (req, res) => {
  const {event_title, event_description, event_date} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO user_media (event_title, event_description, event_date) VALUES($1, $2, $3) RETURNING *',
      [event_title, event_description, event_date],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export default {
  getUsers,
  loginUser,
  addUser,
  getFriends,
  addFriends,
  getGamingReviewSites,
  addGamingReviewSites,
  getProfilePic,
  addProfilePic,
  getUserMedia,
  addUserMedia,
  getEsportsEvents,
  addEsportsEvents,
};
