// middleware/adminMiddleware.js -- debug-friendly version
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    // LOG incoming sources
    console.log('--- adminMiddleware incoming ---');
    console.log('Request URL:', req.method, req.originalUrl);
    console.log('Authorization header:', req.headers.authorization || null);
    console.log('Cookie token:', req.cookies ? req.cookies.token : null);

    // 1) Read token (header preferred)
    let token = null;
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token taken from Authorization header');
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('Token taken from cookie');
    }

    if (!token) {
      console.log('No token provided -> 401');
      return res.status(401).json({ ok: false, error: 'No token provided' });
    }

    // 2) Verify token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_KEY);
      console.log('JWT verify success. payload:', payload);
    } catch (err) {
      console.log('JWT verify FAILED:', err.message);
      return res.status(401).json({ ok: false, error: 'Invalid token: ' + err.message });
    }

    // 3) Resolve id from payload
    const userId = payload._id || payload.id || payload.userId || payload.userID;
    if (!userId) {
      console.log('Token has no id field -> 401, payload:', payload);
      return res.status(401).json({ ok: false, error: 'Id missing in token payload' });
    }

    // 4) Find user
    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.log('User not found for id:', userId);
      return res.status(401).json({ ok: false, error: "User doesn't exist" });
    }

    if (user.isBlocked) {
      console.log('User is blocked:', userId);
      return res.status(403).json({ ok: false, error: 'User is blocked' });
    }

    // attach and continue
    req.user = user;
    req.result = user;
    console.log('adminMiddleware: ok -> next()\n');
    next();
  } catch (err) {
    console.error('adminMiddleware unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'Server error in auth' });
  }
};
