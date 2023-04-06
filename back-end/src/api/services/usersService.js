const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const auth = require('../auth/authService');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getUserByName = async (name) => {
  const user = await User.findOne({ where: { name } });

  return user;
};

const register = async (name, email, password, role = 'customer') => {
  const passHashed = md5(password);
  const isUser = await getUserByEmail(email) || await getUserByName(name);

  if (isUser) return { status: 409, message: 'User already exists' };

  const newUser = await User.create({ 
    name, 
    email, 
    password: passHashed, 
    role,
  });

  if (!newUser) return { status: 404, message: 'Error' };

  const dataUserCustomer = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };

  const token = jwt.sign({ name, email, role }, auth.secret, { expiresIn: auth.expires });
  const result = { newUser, dataUserCustomer, token };

  return result;
};

const getAllUsers = async () => {
  const users = await User.findAll({ where: { 
    [Op.or]: [{ role: 'customer' }, { role: 'seller' }] } });
  return users;
};

const deleteUser = async (id) => {
  await User.destroy({ where: id });
  return 'success';
};

module.exports = {
  getUserByEmail,
  register,
  getAllUsers,
  deleteUser,
};