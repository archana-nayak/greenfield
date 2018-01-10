const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('There was an error connecting to the database');
  }
  console.log('Connected to the database');
});

//Given a user id, get the preferences for that user
const getPreferencesForUser = (params, callback) => {
  //TODO
};

module.exports = {
  getPreferencesForUser
};