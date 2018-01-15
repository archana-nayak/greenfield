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
        },
      }
      knex.select('users.id', 'users.username', 'users.password')
                .from('users')
                .where('users.id', '=', userId).then(function(row) {
        row = row[0];

        if (!row) {
            callback('Could not find user with that ID', null);
        } else {
            loginUser.local.username      = row.username;
            loginUser.local.password      = row.password;

            callback(null, loginUser);
        }
    });
};

module.exports = {
    createNewUser       : createNewUser,
    getUserCredentials  : getUserCredentials,
    User                : User
};
