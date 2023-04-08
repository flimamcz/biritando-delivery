const express = require('express');
const usersController = require('../controllers/usersController');
const salesController = require('../controllers/salesController');
// const tokenValidation = require('../middlewares/authMiddleware');

const sellerRouter = express.Router();

sellerRouter.get('/orders/user/:id', salesController.getAllOrders);
sellerRouter.get('/orders/:id', salesController.getOrderById);
sellerRouter.put('/orders/:id', salesController.updateOrderStatus);
sellerRouter.get(
'/',
// tokenValidation,
usersController.getAllSellers,
);

module.exports = sellerRouter;