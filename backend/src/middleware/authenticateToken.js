import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decodedUser = jwt.verify(token, secretKey);

    // Log the decoded user to check its structure
    console.log('Decoded user:', decodedUser);

    // Ensure the structure of req.user matches how the JWT was signed
    req.user = decodedUser;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ error: 'Invalid token.' });
  }
}
