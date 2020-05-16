const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy;



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


//local authentication
passport.use(new LocalStrategy({
  username:'username',
  password:'password',

},
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {

        return done(null, false);
      }

      return done(null, user);
    });
  }
));



//google authentication
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                done(null, currentUser);
            } else {
                // if not, create user in db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    FirstName:profile._json.given_name,
                    LastName:profile._json.family_name
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);
