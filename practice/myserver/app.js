var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");


var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/categories', categoryRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const DB_STR = "mongodb+srv://dhavalll852004_db_user:HAy6x0lelQWI4WvP@cluster0.1okxzjw.mongodb.net/dhaval";

mongoose.connect(DB_STR)
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log("Connection Failed", err));

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;