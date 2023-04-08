const { Sales, User } = require('../../database/models');

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
};

const getSellerById = async (id) => {  
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

const getAllOrders = async (id) => {
  const orders = Sales.findAll({ where: { sellerId: id } });
  return orders;
};

const updateOrderStatus = async (newStatus, id) => {
  const orders = await Sales.update({ status: newStatus }, { where: { id } }); 
  return orders;
};

module.exports = {
  getSellerById,
  getAllOrders,
  getAllSellers,
  updateOrderStatus,
};