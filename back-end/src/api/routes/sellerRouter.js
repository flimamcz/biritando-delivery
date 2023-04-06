const express = require('express');
const sellerController = require('../controllers/sellerController');
// const tokenValidation = require('../middlewares/authMiddleware');

const sellerRouter = express.Router();

sellerRouter.get('/orders/user/:id', sellerController.getAllOrders);
sellerRouter.get('/orders/:id', sellerController.getById);
sellerRouter.get(
'/',
// tokenValidation,
sellerController.getAll,
);
sellerRouter.put('/orders/:id', sellerController.updateOrderStatus);

module.exports = sellerRouter;