const pg = require('pg');
const pgConfig = require('./config.js');
const pgClient = new pg.Client(pgConfig);
pgClient.connect((err) => {
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
