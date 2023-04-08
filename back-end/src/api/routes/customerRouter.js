const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const customerRouter = express.Router();

customerRouter.get('/products', productsController.getAllProducts);
customerRouter.post('/products', productsController.createProductsSale);
customerRouter.get('/orders/user/:id', salesController.getAllOrders);
customerRouter.get('/orders/:id', salesController.getOrderById);
customerRouter.put('/orders/:id', salesController.updateOrderStatus);
customerRouter.post('/orders', salesController.createSale);

module.exports = customerRouter;