const request = require('request');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');

const getMeetupsByLatLon = (lat, lon, callback) => {
  console.log(`we are looking up the meetups near ${lat} and ${lon}`);
  console.log('HEY CAN I SEE THIS');
  var options = {url : `http://api.meetup.com//find/upcoming_events?\
    photo-host=public&fields=group_photo&page=20&key=${config.MEETINGS_API_KEY}&lat=${lat}&lon=${lon}&radius=1`,
    headers: {'User-Agent': 'request'}
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log(body);
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
      console.log('place is ', place);
      console.log(place.results[0]);
      var lat = place.results[0].geometry.location.lat;
      var lon = place.results[0].geometry.location.lng;
      console.log(`the lat is ${lat} and the lon is ${lon}`);
      callback(null, lat, lon);
    }
  })
}

module.exports.getMeetupsByLatLon = getMeetupsByLatLon;
module.exports.getLatLon = getLatLon;
