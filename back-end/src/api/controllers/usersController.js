import registerService from '../services/registerService';

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  const newRegistro = await registerService.register(nome, email, senha);

  if (newRegistro.type) return res.status(404).json({ message: newRegistro.messsage });

  return res.status(201).json(newRegistro);
};

export default register;