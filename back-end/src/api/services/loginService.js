const jwt = require('jsonwebtoken');
const md5 = require('md5');
const auth = require('../auth/authService');
const usersService = require('./usersService');

const newLogin = async (email, password) => {  
  const passwordHash = md5(password);
  const user = await usersService.getUserByEmail(email);
  
  if (!user || user.password !== passwordHash) {
    return { type: 'INVALID_FIELDS', message: 'Invalid fields' }; 
  }

  const token = jwt.sign({ data: { userId: user.id } }, auth.secret, { expiresIn: auth.expires });

  const result = {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };

  return result;
};

module.exports = {
  newLogin,
};