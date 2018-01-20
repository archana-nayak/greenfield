var DB = require('./database/config').DB,
    knex = DB.knex;

var User = DB.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
});
var UserEvents = DB.Model.extend({
    tableName: 'user_events',
    idAttribute: 'id',
});
var EventThing = DB.Model.extend({
    tableName: 'userCreatedEvents',
    idAttribute: 'event_id',
});
function getNonApiEvents(event_id, username, callback) {
      knex.select('userCreatedEvents.event_name', 'userCreatedEvents.event_location', 'userCreatedEvents.event_description', 'userCreatedEvents.event_topic', 'userCreatedEvents.event_date', 'userCreatedEvents.event_time')
                .from('userCreatedEvents')
                .where('userCreatedEvents.username', '=', username).then(function(row) {
                  console.log(row);
                  let result = [];
                  result.push(row);
        row = row[0];
        if (!row) {
            callback('Could not find event', null);
        } else {
            let test = result;
            callback(null, test);
        }
    })
  }

function createNewUser(callback) {
    new User().save().then(function(user) {
        callback(user.toJSON().id);
    });
}
function getUserCredentials(userId, callback) {
    var loginUser = {
        local: {
            username: '',
            password: '',
            biography: '',
            location: '',
            name: '',
            age: 0,
            image: '',
        },
      }
      knex.select('users.id', 'users.username', 'users.password', 'users.biography', 'users.location', 'users.name', 'users.age', 'users.profilepic','users.location')
                .from('users')
                .where('users.id', '=', userId).then(function(row) {
        row = row[0];
        if (!row) {
            callback('Could not find user with that ID', null);
        } else {
            loginUser.local.username      = row.username;
            loginUser.local.password      = row.password;
            loginUser.local.biography     = row.biography;
            loginUser.local.location      = row.location;
            loginUser.local.age           = row.age;
            loginUser.local.name          = row.name;
            loginUser.local.image         = row.profilepic;
            callback(null, loginUser);
        }
    });
};
function getUserEvents(username, callback) {
    var userEvents = {
        local: {
            username: '',
            events: [],
        },
      }
      knex.select('user_events.id', 'user_events.username', 'user_events.events')
                .from('user_events')
                .where('user_events.username', '=', username).then(function(row) {
        row = row[0];
        if (!row) {
            callback('Could not find events from that user', null);
        } else {
            userEvents.local.username      = row.username;
            userEvents.local.events        = row.events;
            callback(null, userEvents);
        }
    });
};
module.exports = {
    createNewUser       : createNewUser,
    getUserCredentials  : getUserCredentials,
    User                : User,
    UserEvents          : UserEvents,
    EventThing          : EventThing,
    getUserEvents       : getUserEvents,
    getNonApiEvents     : getNonApiEvents
};
