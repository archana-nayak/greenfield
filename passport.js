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
      console.log('im in here des')
        Model.grabUserCredentials(id, function(err, user) {
            console.log('im in here grabbing')
            done(err, user);
        });
    });
    passport.use(new LocalStrategy(function(username, password, done) {
      console.log('in here')
        const hash = bcrypt.hashSync(password, 10);
        new Model.User({username: username}).fetch().then(function(data) {
          console.log('IM IN HERE', data)
            var user = data;
            if (user === null) {
                return done(null, false, { message: 'Invalid username or password' });
            } else {
                user = data.toJSON();
                if(!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid password' });
                } else {
                    console.log('im not failing?', user)
                    return done(null, user);
                }
            }
        });
      }));
    }
