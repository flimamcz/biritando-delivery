const express = require('express');
const cors = require('cors');
const path = require('path');
const adminRouter = require('./routes/adminRouter');
const customerRouter = require('./routes/customerRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const salesRouter = require('./routes/saleRouter');
const sellerRouter = require('./routes/sellerRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/customer', customerRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/sales', salesRouter);
app.use('/seller', sellerRouter);
app.use('/user', userRouter);

module.exports = app; 
