const saleService = require('../services/saleService');

const getSaleProducts = async (req, res) => {
  const { id } = req.params;
  const products = await saleService.getSaleProducts(Number(id));
  if (products.type) return res.status(404).json({ message: products.message });
  return res.status(200).json(products);
};

module.exports = { getSaleProducts };