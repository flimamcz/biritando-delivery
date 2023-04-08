const sellerService = require('../services/sellersService');

const getAllSellers = async (_req, res) => {
  const sellers = await sellerService.getAllSellers();
  return res.status(200).json(sellers);
};

const getAllOrders = async (req, res) => {
  const { id } = req.params;
  const products = await sellerService.getAllOrders(id);
  return res.status(200).json(products);
};

const getSellerById = async (req, res) => {
  const { id } = req.params;
  const products = await sellerService.getSellerById(Number(id));
  return res.status(200).json(products);
};

const updateOrderStatus = async (req, res) => {
  const { newStatus } = req.body;
  const { id } = req.params;
  const updatedOrder = await sellerService.updateOrderStatus(newStatus, id);
  return res.status(200).json(updatedOrder);
};

module.exports = { getSellerById, getAllOrders, getAllSellers, updateOrderStatus };