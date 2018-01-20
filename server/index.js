const flash = require('flash');
const express = require('express');
const helpers = ('./helpers.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const Model = require('../model2.js');
const User = Model.User;
const request = require('request');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const $ = require('jquery')
const config = require('./config.js');
const app = express();
require('../passport.js')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({secret: 'haha', name: 'session_id', saveUninitialized: true, resave: true, cookie: {
  maxAge: 2419200000 }}));
app.use(flash());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/login', express.static(__dirname + '/../client/dist'));
app.use('/logout', express.static(__dirname + '/../client/dist'));
app.use('/signup', express.static(__dirname + '/../client/dist'));
app.use('/home', express.static(__dirname + '/../client/dist'));
app.use('/profile', express.static(__dirname + '/../client/dist'));
app.get('/home', function(req, res){
  if(req.isAuthenticated()){
    next();
  }
  res.send({redirect: '/login'})
});
app.get('/users', function(req, res){
  res.send(req.user.local)
});
app.get('/profile', function(req, res){
  if(req.isAuthenticated()){
    next();
  }
  res.send({redirect: '/login'})
})
app.get('/session', function(req, res){
  if(!req.isAuthenticated()){
  res.send({redirect: '/login'});
 } else {
   res.send({redirect: '/home'});
 }
});
const getMeetupsByLatLon = (lat, lon, callback) => {
  console.log(`we are looking up the meetups near ${lat} and ${lon}`);
  var options = {url : `http://api.meetup.com//find/upcoming_events?\
    photo-host=public&fields=group_photo&page=20&key=${config.MEETINGS_API_KEY}&lat=${lat}&lon=${lon}&radius=1`,
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
      var lat = place.results[0].geometry.location.lat;
      var lon = place.results[0].geometry.location.lng;
      callback(null, lat, lon);
    }
  })
}
app.post('/auth',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }));
app.get('/meetups', function(req, res){
  let sessionID = req.sessionID;
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
            res.render('/signup', { title: 'signup', errorMessage: 'username already exists' });
        } else {
            var email = user.email
            var password = user.password;
            var hash = bcrypt.hashSync(password, 10);
            let sessionID = req.sessionID;
            var createdAt = function() { return new Date(); }
            var signUpUser = new Model.User({
              username: user.username,
              password: hash,
              email: email,
              name: user.name,
              created_at: createdAt(),
              session_id: sessionID,
              biography: user.biography,
              location: user.location,
              age: user.age,
            });
            signUpUser.save({}, {method: 'insert'}).then(function(model) {
                res.redirect('/login');
            });
        }
    });
});
app.post('/userevents', function(req,res){
  let username = req.user.local.username;
  const meetup = req.body;
  let result = [];
  var eventPromise = new Model.UserEvents({ username: req.user.local.username }).fetch();
  return eventPromise.then(function(model) {
    if(model){
      res.sendStatus(400);
      // if (model) {
      //   result.push(model.attributes.events);
      //   result.push(meetup);
      //   console.log(result);
      //   console.log('hihihihihihi', result)
      //   username = req.user.local.username
      //   var addEvent = new Model.UserEvents({
      //     username: username,
      //     events: result
      //   });
        // addEvent.save({}, {method: 'insert'}).then(function(model) {
        //     res.sendStatus(201);
        // });
      } else {
          result.push(JSON.stringify(meetup, null, 2));
          console.log('heyrerye', result)
          username = req.user.local.username
          let events = meetup;
          var addEvent = new Model.UserEvents({
            username: username,
            events: meetup
          });
          addEvent.save({}, {method: 'insert'}).then(function(model) {
              res.sendStatus(201);
          });
      }
  });
});
app.get('/userevents', function(req, res){
  Model.getUserEvents(req.user.local.username, function(err, events) {
    if(err){
      console.log(err);
    } else {
       console.log(events.local.events)
      res.send(events);
    }
    });
});
app.post('/logout', function(req, res){
  //res.setHeader("Content-Type", "text/html");
  req.session.destroy();
  req.logout();
  res.send({redirect: '/'});
});
app.listen(3000, function(){
  console.log('listening on port 3000!')
});
