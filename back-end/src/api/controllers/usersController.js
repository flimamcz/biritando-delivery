const userService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newRegistro = await userService.register(name, email, password);

  if (newRegistro.status) {
    return res.status(newRegistro.status).json({ message: newRegistro.messsage });
  }

  return res.status(201).json(newRegistro);
};

module.exports = { register };