require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var todosRouter = require('./routes/todos');
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ===== CORS (Important for React) =====
app.use(cors({
  origin: "http://localhost:5173",   // Your React Vite port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===== Routes =====
app.use('/', indexRouter);

app.use('/categories', categoryRouter);   // Fixed
app.use('/product', productRouter);      // Fixed
app.use('/todos', todosRouter);           // Fixed
app.use("/api/auth", authRouter);

// ===== MongoDB Connection (Your Database) =====
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