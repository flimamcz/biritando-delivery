const { Sales, SalesProducts, Product } = require('../../database/models');

const getbyId = async (saleId) => {  
  const saleProduct = await SalesProducts.findAll(
    { where: { saleId } },
    { include: [{ model: Sales, as: 'sales' },
    { model: Product, as: 'products', attributes: { exclude: ['url_image'] } },
  ] },
);
  return saleProduct;
};

// const getbyId = async (id) => {  
//   const sale = await Sales.findOne({ where: { sellerId: id } });
//   const { saleId } = sale;
//   const salesProducts = await getSaleProducts(saleId);
//   const result = { ...sale, ...salesProducts };
//   return result;
// };

module.exports = {
  getbyId,
};