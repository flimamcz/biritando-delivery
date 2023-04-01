const userService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newRegistro = await userService.register(name, email, password, role);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.message });
  }

  return res.status(201).json(newRegistro);
};

module.exports = { register };