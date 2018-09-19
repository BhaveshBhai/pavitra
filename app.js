var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var users = require('./models/users'); // user model to asccess user methods


// get an instance of the router for api routes
var apiRoutes = express.Router();
var routePrefix = '/api';
var usersRoute = require('./routes/users');
var designTypeRoute = require('./routes/DesignType');
var designRoute = require('./routes/Design');
var orderRoute = require('./routes/Order');
var requirementRoute = require('./routes/Requirement');
var advertisementRoute = require('./routes/advertisement');
var jaherKhabarRoute = require('./routes/jaherKhabar');
var dailyNewRoute = require('./routes/dailyNew');
var offersRoute = require('./routes/offers');

app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function (req, res) {
  var id = req.query.id;
  if(!!id){
    users.setUserSettings(id,function(err,rows){
      if (err) {
        res.json(err);
      }
    });
  }

  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
    
});

// TODO: route to authenticate a user (POST http://localhost:3000/api/authenticate)

// TODO: route middleware to verify a token

app.use('/api', apiRoutes);
app.use(routePrefix + '/users', usersRoute);
app.use(routePrefix + '/designType', designTypeRoute);
app.use(routePrefix + '/design', designRoute);
app.use(routePrefix + '/order', orderRoute);
app.use(routePrefix + '/requirement', requirementRoute);
app.use(routePrefix + '/advertisement', advertisementRoute);
app.use(routePrefix + '/jaherKhabar', jaherKhabarRoute);
app.use(routePrefix + '/dailyNew', dailyNewRoute);
app.use(routePrefix + '/offers', offersRoute);

module.exports = app;