const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_CON;
const Account = require('./models/account');
const Aeroplane = require('./models/aeroplane');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aeroplaneRouter = require('./routes/aeroplane');
const boardRouter = require('./routes/board');
const chooseRouter = require('./routes/choose');
const resourceRouter = require('./routes/resource');

const app = express();

// Passport Configuration
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        // Use the authenticate method provided by passport-local-mongoose
        user.authenticate(password, function (err, isValid) {
          if (err) {
            return done(err);
          }
          
          if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          
          return done(null, user);
        });
      })
      .catch(function (err) {
        return done(err);
      });
  }
));


// Express Session Configuration
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to DB succeeded');

  // Seeding the collection if needed
  async function recreateDB() {
    // Delete everything
    await Aeroplane.deleteMany();

    // Create instances
    const instances = [
      { aeroplane_type: "Indigo", color: 'Brown', number_of_wings: 4 },
      { aeroplane_type: "Vistara", color: 'gray', number_of_wings: 4 },
      { aeroplane_type: "Jetblue", color: 'green', number_of_wings: 4 }
    ];

    instances.forEach(async (instance) => {
      try {
        await new Aeroplane(instance).save();
        console.log(`Object saved: ${instance.aeroplane_type}`);
      } catch (err) {
        console.error(err);
      }
    });
  }

  const reseed = true;
  if (reseed) {
    recreateDB();
  }
});

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/static'));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aeroplane', aeroplaneRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

// 404 Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Global Error Handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
