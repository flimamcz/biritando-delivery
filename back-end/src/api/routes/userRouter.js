const express = require('express');

const userController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;