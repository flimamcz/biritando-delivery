const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../../database/models');
const auth = require('../auth/authService');

const register = async (nome, email, senha) => {
  const passHashed = md5(senha);

  const isUser = this.getUserByEmail(email);

  if (isUser) return { type: 'errorAoCriar', message: 'User already exists' };

  const newUser = await User.insert({ where: { nome, email, senha: passHashed } });

  if (!newUser) return { type: 'errorAoCriar', message: 'Error' };

  const token = jwt.sign({ data: { nome, email } }, auth.secret, { expiresIn: auth.expires });

  const result = { ...newUser, token };

  return result;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

module.exports = {
  getUserByEmail,
  register,
};