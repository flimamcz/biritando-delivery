const { Sales, SalesProducts, Product, User } = require('../../database/models');
const usersService = require('./usersService');

const getAll = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
};

const getById = async (saleId) => {  
  const saleProduct = await SalesProducts.findAll(
    { where: { saleId } },
    { include: [{ model: Sales, as: 'sales' },
    { model: Product, as: 'products', attributes: { exclude: ['url_image'] } },
  ] },
);
  return saleProduct;
};

const getAllOrders = async (email) => {  
  const { id } = usersService.getUserByEmail(email);
  const orders = Sales.findAll({ where: { sellerId: id } });
  return orders;
};

// const getbyId = async (id) => {  
//   const sale = await Sales.findOne({ where: { sellerId: id } });
//   const { saleId } = sale;
//   const salesProducts = await getSaleProducts(saleId);
//   const result = { ...sale, ...salesProducts };
//   return result;
// };

module.exports = {
  getById,
  getAllOrders,
  getAll,
};