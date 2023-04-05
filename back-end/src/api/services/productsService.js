const { Product, Sales, User } = require('../../database/models');
const usersService = require('./usersService');

const getAll = async () => {  
  const allProducts = await Product.findAll();
  return allProducts;
};

const getById = async (id) => {  
  const sale = await Sales.findOne(
    {
      where: { id },
      include: [
        {
          model: User,
          as: 'customer',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
        {
          model: User,
          as: 'seller',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
      ],
    },
);
  return sale;
};

const getAllOrders = async (email) => {  
  const { id } = await usersService.getUserByEmail(email);
  const orders = Sales.findAll({ where: { userId: id } });
  return orders;
};

const createSale = async (saleInfo, email) => {
  const { id } = await usersService.getUserByEmail(email);
  const sale = await Sales.create({ ...saleInfo, userId: id });
  return sale;
};

module.exports = {
  getAll,
  getById,
  getAllOrders,
  createSale,
};