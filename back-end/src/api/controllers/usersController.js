import userService from '../services/usersService';

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  const newRegistro = await userService.register(nome, email, senha);

  if (newRegistro.type) return res.status(404).json({ message: newRegistro.messsage });

  return res.status(201).json(newRegistro);
};

export default register;