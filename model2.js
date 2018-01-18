var DB = require('./database/config').DB,
    knex = DB.knex;

var User = DB.Model.extend({
    tableName: 'users',
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

module.exports = {
    createNewUser       : createNewUser,
    getUserCredentials  : getUserCredentials,
    User                : User
};
