const express = require('express');
const productsController = require('../controllers/productsController');
const sellerController = require('../controllers/sellerController');

const customerRouter = express.Router();

customerRouter.get('/products', productsController.getAllProducts);
customerRouter.get('/orders/user/:id', productsController.getAllOrders);
customerRouter.get('/orders/:id', productsController.getById);
customerRouter.post('/orders', productsController.createSale);
customerRouter.post('/products', productsController.createProductsSale);
customerRouter.put('/orders/:id', sellerController.updateOrderStatus);

module.exports = customerRouter;