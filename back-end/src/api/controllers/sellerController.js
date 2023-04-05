const sellerService = require('../services/sellerService');

const getAll = async (_req, res) => {
  const sellers = await sellerService.getAll();
  return res.status(200).json(sellers);
};

const getAllOrders = async (req, res) => {
  const { email } = req.body;
  const products = await sellerService.getAllOrders(email);
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await sellerService.getById(Number(id));
  return res.status(200).json(products);
};

module.exports = { getById, getAllOrders, getAll };