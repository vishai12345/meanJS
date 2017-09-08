var booking = require('./bookingRoute.js');
var user = require('./userRoute.js');
var authenticate = require('./authenticate.js');
var apiAuthenticate = require('./api-authenticate.js');
var options  = require('../config/appleConfig.js');
var apn = require('apn');

var express     = require('express');
var apnProvider = new apn.Provider(options);
// app/routes.js
module.exports = function(app, passport) {
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)

    app.use('/booking',isLoggedIn ,booking);

    app.use('/user',isLoggedIn ,user);

    app.use('/auth' ,authenticate);

    app.use('/api' ,apiAuthenticate);

    app.get('/send-notification',function (req,res) {
        var deviceToken = "900d245f2e08480a917712da4f39a4e8c19f9a67ebd59b5f09f2b94b098cf53d";

        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
        note.payload = {'messageFrom': 'John Appleseed'};
        note.topic = "com.encoresky.davisimperial";

        apnProvider.send(note, deviceToken).then( function(result){
                console.log(result);
        });
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send(false);
}