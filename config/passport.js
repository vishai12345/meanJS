// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(null, false, 'Something went wrong');

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, 'That email is already taken.');
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.email    = email;
                newUser.mobile    = req.body.mobile;
                newUser.password = newUser.generateHash(password);
                newUser.verification_code = Math.floor(Math.random() * 1000000) + 1;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        return done(null, false, 'User is not added');
                    return done(null, newUser);
                });
            }

        });

        });

    }));

        // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(null, false, 'Something went wrong');

            // if no user is found, return the message
            if (!user)
                return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

    passport.use('jwt', new JwtStrategy(jwtOptions,
        function(jwt_payload, next) {
            // usually this would be a database call:
            User.findOne( {_id: jwt_payload.id}, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    next(null, false,'Something Wrong');

                // if no user is found, return the message
                if (!user)
                    next(null, false,'Unauthorized User'); // req.flash is the way to set flashdata using connect-flash

                // all is well, return successful user
                next(null, user,'success');
            });
    }));

};
