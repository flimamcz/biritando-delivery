const { Sales, User } = require('../../database/models');
const usersService = require('./usersService');

const getAll = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
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