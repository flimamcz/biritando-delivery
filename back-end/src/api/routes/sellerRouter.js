const express = require('express');
const usersController = require('../controllers/usersController');
const salesController = require('../controllers/salesController');

const sellerRouter = express.Router();

sellerRouter.get('/orders/user/:id', salesController.getAllOrdersSeller);
sellerRouter.get('/orders/:id', salesController.getOrderById);
sellerRouter.put('/orders/:id', salesController.updateOrderStatus);
sellerRouter.get('/', usersController.getAllSellers);

module.exports = sellerRouter;