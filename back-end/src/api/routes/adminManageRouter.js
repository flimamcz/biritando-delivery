const express = require('express');

const registerController = require('../controllers/usersController');

const adminRegisterRouter = express.Router();

adminRegisterRouter.post('/', registerController.adminRegister);

module.exports = adminRegisterRouter;