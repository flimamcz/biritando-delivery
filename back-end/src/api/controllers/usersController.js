const userService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newRegistro = await userService.register(name, email, password);
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

  const newRegistro = await userService.register(name, email, password, role);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.message });
  }

  const resultNewUser = {
    ...newRegistro.newUser.dataValues,
    token: newRegistro.token,
  };

  return res.status(201).json(resultNewUser);
};

module.exports = { register, registerAdm };