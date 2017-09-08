// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var user = require('./user.js');
var Schema = mongoose.Schema

// define the schema for our user model
var bookingSchema = mongoose.Schema({
    address       : {
        type:String,
    },
    status     : {
        type    : String,
    },
    zipcode_id       : {
        type    : String
    },
    custom_description :{
        type    : String,
        default : null
    },
    booked_date :{
        type: Date,
        default: Date.now
    },
    user_id:{type: Schema.Types.ObjectId, ref: 'users'},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Booking', bookingSchema);
