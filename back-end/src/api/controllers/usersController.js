const userService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newRegistro = await userService.register(name, email, password);

  if (newRegistro.type) return res.status(404).json({ message: newRegistro.messsage });

  return res.status(201).json(newRegistro);
};

module.exports = { register };