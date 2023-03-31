const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../../database/models');
const auth = require('../auth/authService');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const register = async (name, email, password, role = 'customer') => {
  const passHashed = md5(password);

  const isUser = await getUserByEmail(email);

  if (isUser) return { status: 409, message: 'User already exists' };

  const newUser = await User.create({ 
    name, 
    email, 
    password: passHashed, 
    role,
  });

  if (!newUser) return { status: 404, message: 'Error' };

  const token = jwt.sign({ data: { name, email } }, auth.secret, { expiresIn: auth.expires });

  const result = { newUser, token };

  return result;
};

module.exports = {
  getUserByEmail,
  register,
};