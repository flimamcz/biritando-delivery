const express = require('express');
const registerRouter = require('./routes/userRouter');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.json());
app.use('/register', registerRouter);

module.exports = app; 
