// load up the user model
var express = require('express')
var router = express.Router();
var User  = require('../app/models/user');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var smtpTransport = require('./mail.js');
var passport    = require('passport');

router.get('/secret', function(req, res, next) {
    passport.authenticate('jwt',function(err, user, info) {
        if (err) { return res.send({'error':err,'message':info}); }

        if (!user) { return res.send({'error':err,'message':info}); }

        return res.json({'success':true,'message':'You are accessable','user':user});
    })(req, res, next);
});

router.post("/login", function(req, res) {
    if(req.body.email && req.body.password){
        var email = req.body.email;
        var password = req.body.password;
    }else {
        return res.send({'error':true,'message':'Email and password is required'});
    }

    const query = {email:email};
    User.findOne(query,function(err,user){
        if (err) { return res.send({'error':true,'message':'Something wrong'}); }

        if( ! user ){
            res.status(401).json({'error':true,'message':"No such user found"});
        }
        if (!user.validPassword(password))
            res.status(401).json({'error':true,'message':"Password is wrong"});

        var payload = {id: user._id};
        var secretOrKey = 'tasmanianDevil';
        var token = jwt.sign(payload, secretOrKey,{
            expiresIn : 60*60*24
        });
        res.json({message: "ok", token: token});
    })
});

router.post("/register", function(req, res) {
    if(req.body.email && req.body.password && req.body.mobile){
        var email       = req.body.email;
        var password    = req.body.password;
        var mobile      = req.body.mobile;
    }else {
        return res.send({'success':false,'message':'All fields are required'});
    }

    const query = {email:email};
    User.findOne(query,function(err,user){
        if (err) { return res.send({'success':false,'message':'Something wrong'}); }

        if(  user ){
            res.status(401).json({'success':false,'message':"Email is already registered"});
        }else{
            // if there is no user with that email
            // create the user
            var newUser            = new User();
            // set the user's local credentials
            newUser.email    = email;
            newUser.mobile    = req.body.mobile;
            newUser.password = newUser.generateHash(password);

            newUser.save(function(err) {
                if (err)
                    res.send({'success':false,'message':"User is not registered"});

                var payload = {id: newUser._id};
                var secretOrKey = 'tasmanianDevil';
                var token = jwt.sign(payload, secretOrKey,{
                    expiresIn : 60*60*24
                });
                res.json({'success':false,'message': "You are registered", token: token});
            });
        }
    })
});

module.exports = router