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

  const token = jwt.sign({
   name: user.name, email, role: user.role,
  }, auth.secret, { expiresIn: auth.expires });

  const result = {
    id: user.id,
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