const express = require('express');
const productsController = require('../controllers/productsController');
const sellerController = require('../controllers/sellersController');

const customerRouter = express.Router();

customerRouter.get('/products', productsController.getAllProducts);
customerRouter.post('/products', productsController.createProductsSale);
customerRouter.get('/orders/user/:id', productsController.getAllOrders);
customerRouter.get('/orders/:id', productsController.getById);
customerRouter.put('/orders/:id', sellerController.updateOrderStatus);
customerRouter.post('/orders', productsController.createSale);

module.exports = customerRouter;