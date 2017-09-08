var express = require('express')
var router = express.Router();
var User  = require('../app/models/user');
const path = require('path');
const baseURL = require('../base_url');

var multer  =   require('multer');
var DIR = baseURL;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('photo');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next();
})

router.get('/profile', function(req, res) {
    res.send({user : req.user});
});

router.get('/getAll', function(req, res) {
    User.find({},function(err,data){
        if (err) { return res.send({'error':false,'message':'Something wrong'}); }
        res.send({'data':data});
    })
});

router.post('/photo',function(req,res){
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file.originalname;
        const query = {_id : req.user._id};
        User.findOne(query,function(err,fetchedUser){
            if (err) { return res.send({'error':false,'message':'Something wrong'}); }

            if(!fetchedUser){ return res.send({'status':false,'message':'No found this user'}); }

            fetchedUser.imageURL = path;
            fetchedUser.save(function(err){
                if(err){
                    res.send({'success':false , 'message' : 'Something Wrong'});
                }
                return res.send({'success':true , 'message' : "Upload Completed for "+path});
            })
        })
    });
});

router.post('/changeStatus',  function(req, res) {
    const query = {_id : req.body._id};
    User.findOne(query,function(err,fetchedUser){
        if (err) { return res.send({'error':false,'message':'Something wrong'}); }

        if(!fetchedUser){ return res.send({'status':false,'message':'No found this user'}); }

        fetchedUser.isVerified = !req.body.isVerified;
        fetchedUser.save(function(err){
            if(err){
                res.send({'success':false , 'message' : 'Something Wrong'});
            }
            return res.send({'success':true , 'message' : 'User Status changed'});
        })
    })
});

router.post('/updateProfile',  function(req, res) {
    const query = {_id : req.body._id};
    User.findOne(query,function(err,fetchedUser){
        if (err) { return res.send({'success':false,'message':'Something wrong'}); }

        if(!fetchedUser){ return res.send({'success':false,'message':'No found this user'}); }

        fetchedUser.mobile = req.body.mobile;
        fetchedUser.email = req.body.email;

        fetchedUser.save(function(err){
            if(err){
                res.send({'success':false , 'message' : 'Something Wrong'});
            }
            return res.send({'success':true , 'message' : 'User update successfully'});
        })
    })
});

router.post('/deleteUser',  function(req, res) {
    const query = {_id : req.body._id};
    User.findOne(query,function(err,fetchedUser){
        if (err) { return res.send({'success':false,'message':'Something wrong'}); }

        if(!fetchedUser){ return res.send({'success':false,'message':'No found this user'}); }

        fetchedUser.remove(function(err){
            if(err){
                res.send({'success':false , 'message' : 'Something Wrong'});
            }
            return res.send({'success':true , 'message' : 'User delete successfully'});
        })
    })
});

router.post('/change-password',  function(req, res) {
    const query = {_id : req.user._id};
    User.findOne(query,function(err,fetchedUser){
        if (err) { return res.send({'success':false,'message':'Something wrong'}); }

        if(!fetchedUser){ return res.send({'success':false,'message':'No found this user'}); }

        if (!fetchedUser.validPassword(req.body.currentPassword))
            return res.send({'success':false , 'message' : 'Current password is wrong'});

        fetchedUser.password = fetchedUser.generateHash(req.body.newPassword);
        fetchedUser.save(function(err){
            if(err){
                res.send({'success':false , 'message' : 'Something Wrong'});
            }
            return res.send({'success':true , 'message' : 'Password changed Successfully'});
        })
    })
});

router.post('/verify',  function(req, res) {
    const query = {_id : req.user._id};
    User.findOne(query,function(err,fetchedUser){
        if (err) { return res.send({'error':false,'message':'Something wrong'}); }

        if(!fetchedUser){ return res.send({'status':false,'message':'No found this user'}); }
        console.log(req.body.verification_code,fetchedUser.verification_code);
        if(fetchedUser.verification_code == req.body.verification_code){
            fetchedUser.isVerified = !req.body.isVerified;
            fetchedUser.verification_code = null;
        }else{
            return res.send({'success':false , 'message' : 'Verification code is wrong'});
        }

        fetchedUser.save(function(err){
            if(err){
                res.send({'success':false , 'message' : 'Something Wrong'});
            }
            return res.send({'success':true , 'message' : 'User is verified','user' : fetchedUser});
        })
    })
});

module.exports = router