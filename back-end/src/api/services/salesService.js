const { Sales, Products, Users } = require('../../database/models');
const usersService = require('./usersService');

const getSaleProducts = async (id) => {  
  const sale = await Sales.findAll(
    {
      where: { id },
      include: [{
          model: Products,
          as: 'products',
          through: { attributes: ['quantity'] },
        }],
    },
  );
  if (sale.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  const { products, totalPrice } = sale[0];
  const result = {
    products,
    totalPrice,
  };
  return result;
};

const getOrderById = async (id) => {  
  const sale = await Sales.findOne(
    {
      where: { id },
      include: [
        {
          model: Users,
          as: 'customer',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
        {
          model: Users,
          as: 'seller',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
      ],
    },
);
  return sale;
};

const getAllOrders = async (id) => {
  const orders = Sales.findAll({ where: { sellerId: id } });
  return orders;
};

const createSale = async (saleInfo, email) => {
  const { id } = await usersService.getUserByEmail(email);
  const sale = await Sales.create({ ...saleInfo, userId: id });
  return sale;
};

const updateOrderStatus = async (newStatus, id) => {
  const orders = await Sales.update({ status: newStatus }, { where: { id } }); 
  return orders;
};

module.exports = {
  getSaleProducts,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  createSale,
};