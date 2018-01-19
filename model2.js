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
function createNewUser(callback) {
    new User().save().then(function(user) {
        callback(user.toJSON().id);
    });
}
function getUserCredentials(userId, callback) {
    // Skeleton JSON
    var loginUser = {
        local: {
            username: '',
            password: '',
            biography: '',
            location: '',
            name: '',
            age: 0
        },
      }
      knex.select('users.id', 'users.username', 'users.password', 'users.biography', 'users.location', 'users.name', 'users.age')
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
            callback(null, loginUser);
        }
    });
};
function getUserEvents(username, callback) {
    // Skeleton JSON
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
    getUserEvents       : getUserEvents
};
