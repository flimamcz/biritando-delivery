const userService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newRegistro = await userService.register(name, email, password);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.messsage });
  }

  return res.status(201).json(newRegistro);
};

const adminRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newRegister = await userService.register(name, email, password, role);
  if (newRegister.status) {
    return res.status(newRegister.status).json({ message: newRegister.message });
  }

  return res.status(201).json(newRegister);
};

module.exports = { register, adminRegister };