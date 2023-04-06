const express = require('express');
const salesController = require('../controllers/salesController');

const saleRouter = express.Router();

saleRouter.get('/:id', salesController.getSaleProducts);

module.exports = saleRouter;