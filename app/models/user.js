// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var booking = require('./booking.js');
var Schema = mongoose.Schema

// define the schema for our user model
var userSchema = mongoose.Schema({
    email        : {
        type:String,
        index: true,
        required: true,
        unique: true
    },
    password     : {
        type : String,
        required: true
    },
    mobile       : {
        required: true,
        type    : Number
    },
    isVerified   : {
        type    : Boolean,
        default : false

    },
    verification_code :{
        type    : String,
        default : null
    },
    user_type :{
        type    : String,
        default : 'User'
    },
    imageURL:{
        type    : String,
        default : null
    },
    booking_id:[{type: Schema.Types.ObjectId, ref: 'bookings'}],
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
