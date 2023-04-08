const express = require('express');
const sellersController = require('../controllers/sellersController');
// const tokenValidation = require('../middlewares/authMiddleware');

const sellerRouter = express.Router();

sellerRouter.get('/orders/user/:id', sellersController.getAllOrders);
sellerRouter.get('/orders/:id', sellersController.getSellerById);
sellerRouter.put('/orders/:id', sellersController.updateOrderStatus);
sellerRouter.get(
'/',
// tokenValidation,
sellersController.getAllSellers,
);

module.exports = sellerRouter;