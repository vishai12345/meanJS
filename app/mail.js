// config/config.js
    var nodemailer = require("nodemailer");
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: "happypandey2013@gmail.com",
            pass: "happyhoney"
        }
    });

    module.exports = smtpTransport;