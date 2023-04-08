const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Op } = require('sequelize');
const { Users } = require('../../database/models');
const auth = require('../auth/authService');

const getUserByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } });

  return user;
};

const newLogin = async (email, password) => {  
  const passwordHash = md5(password);
  const user = await this.getUserByEmail(email);
  
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

const getUserByName = async (name) => {
  const user = await Users.findOne({ where: { name } });

  return user;
};

const register = async (name, email, password, role = 'customer') => {
  const passHashed = md5(password);
  const isUser = await getUserByEmail(email) || await getUserByName(name);

  if (isUser) return { status: 409, message: 'User already exists' };

  const newUser = await Users.create({ 
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
  const users = await Users.findAll({ where: { 
    [Op.or]: [{ role: 'customer' }, { role: 'seller' }] } });
  return users;
};

const deleteUser = async (id) => {
  await Users.destroy({ where: { id } });
  return 'success';
};

const getAllSellers = async () => {
  const sellers = await Users.findAll({ where: { role: 'seller' } });
  return sellers;
};

module.exports = {
  register,
  getAllUsers,
  deleteUser,
  newLogin,
  getAllSellers,
};