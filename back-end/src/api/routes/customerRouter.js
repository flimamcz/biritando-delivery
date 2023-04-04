const express = require('express');
const productsController = require('../controllers/productsController');

const customerRouter = express.Router();

customerRouter.get('/products', productsController.getAllProducts);
customerRouter.get('orders/:id', productsController.getByid);

module.exports = customerRouter;