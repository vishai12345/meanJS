// load up the user model
var express = require('express')
var router = express.Router();
var User  = require('../app/models/user');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var smtpTransport = require('./mail.js');
var passport    = require('passport');

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.send(true);
});

// process the signup form
router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) { return res.send({'error':err,'message':info}); }
        if (!user) { return res.send({'error':user,'message':info}); }
        req.logIn(user, function(err) {
            if (err) { return res.send({'error':err,'message':info}); }

            var mailOptions={
                to :      user.email,
                subject : 'Welcome to New world to learn',
                text :    'Verification Code',
                html:     '<h2 style="padding: 20px;background-color:#337ab7 "> Verification Code  :  <span style="color: white" >' +user.verification_code+ ' </span></h2>'
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }
            });
            return res.send({'error':true,'user':user});
        });
    })(req, res, next);
});

router.get('/isLoogedIn', function(req, res) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return res.send({'status':true,'isVerified':req.user.isVerified });

    // if they aren't redirect them to the home page
    res.send({'status':false});
});

// process the login form
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { return res.send({'error':err,'message':info}); }
        if (!user) { return res.send({'error':err,'message':info}); }
        req.logIn(user, function(err) {
            if (err) { return res.send({'error':err,'message':info}); }

            return res.send({'error':true,'user':user});
        });
    })(req, res, next);
});

module.exports = router