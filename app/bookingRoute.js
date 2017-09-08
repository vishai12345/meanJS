var express = require('express')
var router = express.Router();
var Booking  = require('../app/models/booking');
var User  = require('../app/models/user');
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next();
})

router.get('/list/:status', function (req, res) {
    var query = {};
    if(req.params.status != 0 && req.user.user_type === 'User'){
        query = {status:req.params.status,'user_id':req.user._id};
    }else if(req.params.status == 0 && req.user.user_type === 'User'){
        query = {'user_id':req.user._id};
    }else if(req.params.status != 0 && req.user.user_type === 'Admin'){
        query = {status:req.params.status};
    }
    Booking.find(query,function(err,data){
        if (err) { return res.send({'error':false,'message':'Something wrong'}); }
        res.send({'success':true,'data':data});
    })
})

router.get('/cancel/:bookingId', function (req, res) {
    query = {_id:req.params.bookingId};
    Booking.findOne(query,function(err,data){
        if (err) { return res.send({'error':false,'message':'Something wrong'}); }
        data.status = 5;
        data.save(function (err) {
            if(err){
                return res.send({'success':false});
            }
            res.send({'success':true,'message':'Booking is cancelled'});
        })
    })
})

router.post('/book', function (req, res) {
    var newBooking = new Booking;
        newBooking.status = req.body.status;
        newBooking.adress = req.body.address;
        newBooking.zipcode_id = req.body.zipcode_id;
        newBooking.user_id = req.user._id;
        newBooking.custom_description = req.body.custom_description;
    newBooking.save(function (err) {
        if(err){
           return res.send({'success':false,'message':'Your booking is not added'});
        }
        User.findOne({ _id: req.user._id },function (err ,user) {
            user.booking_id.push(newBooking._id);
            user.save(function (err) {
                if(err){
                    newBooking.remove(function (err) {
                        return res.send({'success':false,'message':'Your booking is not added'});
                    });
                }
                res.send({'success':true,'message':'Your booking is added successfully'});
            });
        });
        
    })
})

module.exports = router