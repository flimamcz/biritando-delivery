const sellerService = require('../services/sellerService');

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await sellerService.getById(Number(id));
  return res.status(200).json(products);
};

module.exports = { getById };