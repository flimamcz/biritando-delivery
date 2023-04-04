const express = require('express');
const productsController = require('../controllers/productsController');

const customerRouter = express.Router();

customerRouter.get('/products', productsController.getAllProducts);
customerRouter.get('orders', productsController.getAllOrders);
customerRouter.get('orders/:id', productsController.getById);

module.exports = customerRouter;