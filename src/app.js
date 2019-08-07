const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');

// Mongoose
const mongoose = require('mongoose');

mongoose.connect(
  config.connectionString,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Routes
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const customerRouter = require('./routes/customer');
const orderRouter = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);

module.exports = app;