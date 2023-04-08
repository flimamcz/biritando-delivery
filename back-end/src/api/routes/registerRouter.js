const express = require('express');
const usersController = require('../controllers/usersController');

const registerouter = express.Router();

registerouter.post('/', usersController.register);

module.exports = registerouter;