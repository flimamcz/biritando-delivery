const express = require('express');

const registerController = require('../controllers/usersController');
const tokenValidation = require('../middlewares/authMiddleware');

const adminRouter = express.Router();

adminRouter.post('/manage', tokenValidation, registerController.register);

module.exports = adminRouter;