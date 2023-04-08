const { Sales, Product } = require('../../database/models');

const getSaleProducts = async (id) => {  
  const sale = await Sales.findAll(
    {
      where: { id },
      include: [{
          model: Product,
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

module.exports = { getSaleProducts };