const { Product, Sales } = require('../../database/models');

const getAll = async () => {  
  const allProducts = await Product.findAll();
  return allProducts;
};

const getbyId = async (id) => {  
  const sale = await Sales.findOne({ where: { userId: id } });
  return sale;
};

module.exports = {
  getAll,
  getbyId,
};