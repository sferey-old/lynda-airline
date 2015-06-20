

module.exports = function (flights, db) {
  var express = require('express');
  var session = require('express-session');
  var MongoStore = require('connect-mongo')(session);
  var connect = require('connect');
  

  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var routes = require('./routes/index')(flights);
  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({
      mongooseConnection: db
    }),
    resave: false,
    saveUninitialized: true
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Flight Tracker');
    next();
  });

  app.get('/flight/:number', routes.flight);
  app.put('/flight/:number/arrived', routes.arrived);
  app.get('/list', routes.list);
  app.get('/arrivals', routes.arrivals);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;

};





