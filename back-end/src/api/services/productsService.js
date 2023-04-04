const { Product, Sales } = require('../../database/models');
const usersService = require('./usersService');

const getAll = async () => {  
  const allProducts = await Product.findAll();
  return allProducts;
};

const getById = async (id) => {  
  const sale = await Sales.findOne({ where: { userId: id } });
  return sale;
};

const getAllOrders = async (email) => {  
  const { id } = usersService.getUserByEmail(email);
  const orders = Sales.findAll({ where: { userId: id } });
  return orders;
};

module.exports = {
  getAll,
  getById,
  getAllOrders,
};