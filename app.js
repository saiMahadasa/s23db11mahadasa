var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = process.env.MONGO_CON;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aeroplaneRouter = require('./routes/aeroplane');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var Costume = require("./models/costume");
const resourceRouter = require('./routes/resource');


var app = express();

mongoose.connect(connectionString);
var db = mongoose.connection;+
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to DB succeeded');


  // We can seed the collection if needed on

async function recreateDB(){
 // Delete everything
 await Costume.deleteMany();
 //one instance
 let instance1 = new Costume({costume_type:"ghost", size:'large',cost:15.4});
 let instance2 = new Costume({costume_type:"shirt", size:'medium',cost:19.4});
 let instance3 = new Costume({costume_type:"tshirt", size:'small',cost:10.3});
 instance1.save().then(doc=>{
 console.log("First object saved")}
 ).catch(err=>{
 console.error(err)
 });
 instance2.save().then(doc=>{
  console.log("Second object saved")}
  ).catch(err=>{
  console.error(err)
  });
  instance3.save().then(doc=>{
    console.log("Third object saved")}
    ).catch(err=>{
    console.error(err)
    });

}

let reseed = true;
if (reseed) {recreateDB();}
  
});


// mongoose.connect('mongodb+srv://saimahadasa1999:saimahadasa1999@cluster0.peuzxwr.mongodb.net/?retryWrites=true&w=majority').
// then(() => {
//     console.log("DB connected");
// })
// .catch((err) => console.log(err.message))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/static'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aeroplane', aeroplaneRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);


app.use('/resource', resourceRouter);



// mongoose.connect('mongodb+srv://saimahadasa1999:saimahadasa1999@cluster0.peuzxwr.mongodb.net/?retryWrites=true&w=majority', () => {

// })



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
