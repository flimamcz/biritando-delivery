const express = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRouter = express.Router();

sellerRouter.get('orders', sellerController.getAllOrders);
sellerRouter.get('orders/:id', sellerController.getById);
sellerRouter.get('/', sellerController.getAll);

module.exports = sellerRouter;