const salesService = require('../services/salesService');

const getSaleProducts = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getSaleProducts(Number(id));
  if (products.type) return res.status(404).json({ message: products.message });
  return res.status(200).json(products);
};

const getAllOrders = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getAllOrders(id);
  return res.status(200).json(products);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getOrderById(Number(id));
  return res.status(200).json(products);
};

const createSale = async (req, res) => {
  const { saleInfo, email } = req.body;
  const result = await salesService.createSale(saleInfo, email);
  return res.status(201).json(result);
};

const updateOrderStatus = async (req, res) => {
  const { newStatus } = req.body;
  const { id } = req.params;
  const updatedOrder = await salesService.updateOrderStatus(newStatus, id);
  return res.status(200).json(updatedOrder);
};

module.exports = { getSaleProducts,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  createSale,
};