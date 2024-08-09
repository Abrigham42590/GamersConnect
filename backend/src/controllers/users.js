import pool from '../db'; // Use ES6 import syntax

export const getUsers = async res => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addUser = async (req, res) => {
  const {username, email, password_hash, profile_pic} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users_table (username, password_hash, email, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password_hash, email, profile_pic],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
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

export const getUserMedia = async res => {
  try {
    const result = await pool.query('SELECT * FROM user_media');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addUserMedia = async (req, res) => {
  const {media_url, media_type} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO user_media (media_url, media_type) VALUES($1) RETURNING *',
      [media_url, media_type],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
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
