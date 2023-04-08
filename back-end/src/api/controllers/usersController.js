const usersService = require('../services/usersService');

const newLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await usersService.newLogin(email, password);
  if (login.type) return res.status(404).json({ message: login.message });
  res.status(200).json(login);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newRegistro = await usersService.register(name, email, password);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.message });
  }

  const resultNewUser = {
    ...newRegistro.dataUserCustomer,
    token: newRegistro.token,
  };

  return res.status(201).json(resultNewUser);
};

const registerAdm = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newRegistro = await usersService.register(name, email, password, role);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.message });
  }

  const resultNewUser = {
    ...newRegistro.newUser.dataValues,
    token: newRegistro.token,
  };

  return res.status(201).json(resultNewUser);
};

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(Number(id));
  return res.status(200).send();
};

const getAllSellers = async (_req, res) => {
  const sellers = await usersService.getAllSellers();
  return res.status(200).json(sellers);
};

module.exports = { register, registerAdm, getAllUsers, deleteUser, newLogin, getAllSellers };