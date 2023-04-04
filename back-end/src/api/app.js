const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/userRouter');
const customerRouter = require('./routes/customerRouter');
const adminRouter = require('./routes/adminRouter');
const sellerRouter = require('./routes/sellerRouter');

const app = express();
app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);
app.use('/seller', sellerRouter);

module.exports = app; 
