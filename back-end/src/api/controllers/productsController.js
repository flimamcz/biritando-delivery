const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const createProductsSale = async (req, res) => {
  const { cartItems, id } = req.body;
  await productsService.createProductsSale(cartItems, id);
  return res.status(201).send();
};

module.exports = { getAllProducts, createProductsSale };