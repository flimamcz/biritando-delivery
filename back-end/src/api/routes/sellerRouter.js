const express = require('express');
const sellerController = require('../controllers/productsController');

const sellerRouter = express.Router();

sellerRouter.get('orders/:id', sellerController.getByid);

module.exports = sellerRouter;