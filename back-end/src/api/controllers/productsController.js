const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getAllOrders = async (req, res) => {
  const { email } = req.body;
  const products = await productsService.getAllOrders(email);
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.getById(Number(id));
  return res.status(200).json(products);
};

const createSale = async (req, res) => {
  const { saleInfo, email } = req.body;
  const result = await productsService.createSale(saleInfo, email);
  return res.status(201).json(result);
};

module.exports = { getAllProducts, getById, getAllOrders, createSale };