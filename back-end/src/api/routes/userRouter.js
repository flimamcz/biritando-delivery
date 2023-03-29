const express = require('express');

const registerController = require('../controllers/usersController');

const registerRouter = express.Router();

registerRouter.post('/', registerController.register);

module.exports = registerRouter;