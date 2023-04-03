const express = require('express');

const usersController = require('../controllers/usersController');
const tokenValidation = require('../middlewares/authMiddleware');

const adminRouter = express.Router();

adminRouter.post('/manage', tokenValidation, usersController.registerAdm);

module.exports = adminRouter;