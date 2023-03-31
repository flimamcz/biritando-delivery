const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/userRouter');
const customerRouter = require('./routes/customerRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);

module.exports = app; 
