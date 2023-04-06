const express = require('express');

const userController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;