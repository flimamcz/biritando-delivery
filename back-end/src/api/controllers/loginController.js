const loginService = require('../services/loginService');

const newLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await loginService.newLogin(email, password);
  if (login.type) return res.status(404).json({ message: login.message });
  res.status(200).json(login);
};

module.exports = {
  newLogin,
};