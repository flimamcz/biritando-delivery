const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

module.exports = { getAllProducts };