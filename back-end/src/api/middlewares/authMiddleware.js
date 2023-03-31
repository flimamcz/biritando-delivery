const jwt = require('jsonwebtoken');
require('dotenv/config');
const usersService = require('../services/usersService');
const { secret } = require('../auth/authService');

const tokenValidation = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersService.getUserByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
module.exports = tokenValidation;