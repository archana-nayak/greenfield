const flash = require('flash');
const express = require('express');
const helpers = ('./helpers.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const Model = require('../model2.js');
const request = require('request');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const app = express();
require('../passport.js')(passport);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'lakers rule', name: 'session_id', saveUninitialized: true, resave: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/login', express.static(__dirname + '/../client/dist'));
app.use('/signup', express.static(__dirname + '/../client/dist'));
const getMeetupsByLatLon = (lat, lon, callback) => {
  console.log(`we are looking up the meetups near ${lat} and ${lon}`);
  var options = {url : `http://api.meetup.com//find/upcoming_events?\
    photo-host=public&fields=group_photo&page=20&key=${config.MEETINGS_API_KEY}&lat=${lat}&lon=${lon}`,
    headers: {'User-Agent': 'request'}
  };
  request(options, (err, response, body) => {
    if (err) {

      callback(err, null);
    } else {
      callback(null, body);
    }
  })

};
const getLatLon = (zipcode, callback) => {
  var options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      var place = JSON.parse(body);
      // console.log('place is ', place);
      // console.log(place.results[0]);
      var lat = place.results[0].geometry.location.lat;
      var lon = place.results[0].geometry.location.lng;
      // console.log(`the lat is ${lat} and the lon is ${lon}`);
      callback(null, lat, lon);
    }
  })
}
app.post('/auth',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }));

app.get('/meetups', function(req, res){
  var zipcode = req.param('zipcode');
  var lat = req.param('lat');
  var lon = req.param('lon');
  if (zipcode) {
    getLatLon(zipcode, (err, lat, lon) => {
      if (err) {
        res.send(err);
      }
      getMeetupsByLatLon(lat, lon, (error, meetups) => {
        if (error) {
          res.status(500).json(error);
        }
        res.json(meetups);
      });
     });
  } else {
    getMeetupsByLatLon(lat, lon, (error, meetups) => {
        if (error) {
          res.status(500).json(error);
        }
        res.json(meetups);
      });
    };


});
app.post('/signup', function(req, res, next) {
    var user = req.body;
    var usernamePromise = new Model.User({ username: user.username }).fetch();
    return usernamePromise.then(function(model) {
        if (model) {
            res.render('signup', { title: 'signup', errorMessage: 'username already exists' });
        } else {
            var email = user.email
            var password = user.password;
            var hash = bcrypt.hashSync(password, 10);
            var createdAt = function() { return new Date(); }
            console.log(createdAt())
            var signUpUser = new Model.User({ username: user.username, password: hash, email: email, name: user.name, created_at: createdAt()});

            signUpUser.save({}, {method: 'insert'}).then(function(model) {
                res.redirect('/');
            });
        }
    });
});
app.listen(3000, function(){
  console.log('listening on port 3000!')
});
