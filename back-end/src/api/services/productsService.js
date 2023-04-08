const { Products, SalesProducts } = require('../../database/models');

const getAllProducts = async () => {  
  const allProducts = await Products.findAll();
  return allProducts;
};

const createProductsSale = async (saleItems, id) => {
  saleItems.forEach(async (e) => {
    await SalesProducts.create({ saleId: id, productId: e.id, quantity: e.quantity });
  });
  return null;
};

module.exports = {
  getAllProducts,
  createProductsSale,
};