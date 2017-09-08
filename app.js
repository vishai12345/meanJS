var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8080;
var mongoose    = require('mongoose');
var passport    = require('passport');
var jwt         = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var flash       = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path = require('path');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var userName = [];
var connectedUsers = {};
var rooms = [];

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('add-message', function(message) {
        io.emit('message', {type:'new-message', text: message});
    });

    socket.on('get_online_users',function (data) {
        io.emit('added_one_more', {type:'new-message', text: userName});
    })
    
    socket.on('reset_user_list',function (data) {
        userName.pop(data);
        io.emit('added_one_more', {type:'new-message', text: userName});
    })

    socket.on('user_Typing',function(data){
        io.emit('get_User_Typing', {type:'new-message', text: data});
    })

    socket.on('stop_Typing',function(data){
        io.emit('stop_User_Typing', {type:'new-message', text: data});
    })

    socket.on('add-user',function (user) {
        userName.push(user);
        if(connectedUsers[user] == undefined){
            connectedUsers[user] = socket;
        }
        io.emit('added_one_more', {type:'new-message', text: userName});
        socket.broadcast.emit('to_every_except_sender', {message:"New user is added to global Chat",user:user});
    })

    socket.on('join_private_group',function (data) {
        var room = data.userToJoin+'_'+data.currentUser;
        var room1 = data.currentUser+'_'+data.userToJoin;
        var isExits = rooms.indexOf(room);
        var isExitsAgain = rooms.indexOf(room1);
        if(isExits == -1 && isExitsAgain == -1){
            var userToJoinSocketId = connectedUsers[data.userToJoin];
            var currentUserSocketId = connectedUsers[data.currentUser];
            userToJoinSocketId.join(room);
            currentUserSocketId.join(room);
            rooms.push(room);
        }
    })
    
    socket.on('send_private_message',function (data) {
        //console.log(data);
        var room = data.receiverUser+'_'+data.user.name;
        var room1 = data.user.name+'_'+data.receiverUser;
        console.log(room,room1,rooms);
        var isExits = rooms.indexOf(room);
        var isExitsAgain = rooms.indexOf(room1);
        if(isExits >= 0){
            io.sockets.in(room).emit('get_private_message', {
                type:'new private chat message',text:data
            });
        }else if(isExitsAgain >= 0){
            io.sockets.in(room1).emit('get_private_message', {
                type:'new private chat message',text:data
            });
        }
    })
});

var configDB = require('./config/config.js');

// configuration ===============================================================
mongoose.connect(configDB.url,function() {
	console.log('we are connected with mongoDB');
}); // connect to our database

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//
// app.use(express.static(path.join(__dirname, 'dist')));
//
// app.get('*', function(req, res){
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// uncomment this line
require('./config/passport')(passport); // pass passport for configuration

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
