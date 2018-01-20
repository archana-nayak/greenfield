var config           = require('./database/config.js'),
    LocalStrategy    = require('passport-local').Strategy,
    Model            = require('./model2.js'),
    bcrypt           = require('bcrypt'),
    User             = Model.User;
    passport         = require('passport');
    session          = require('express-session');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        Model.getUserCredentials(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy(function(username, password, done) {
        const hash = bcrypt.hashSync(password, 10);
        new Model.User({username: username}).fetch().then(function(data) {
            var user = data;
            if (user === null) {
                return done(null, false, { message: 'Invalid username or password' });
            } else {
                user = data.toJSON();
                if(!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid password' });
                } else {
                    return done(null, user);
                }
            }
        });
      }));
    }
