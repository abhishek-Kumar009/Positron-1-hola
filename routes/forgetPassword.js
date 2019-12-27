const express=require('express');
const router=express.Router();
const ErrorHandler=require('../_helpers/error-handler');
const User=require('./models.js').User;
const ResetPassword=require('./models').ResetPassword;
const crypto=require('crypto');
const nodemailer = require("nodemailer");
const config=require("../config.json");
const fs=require('fs');
const {sanitizeBody}=require('express-validator/filter');
const path=require('path');

router.post('/reset-password', function (req, res) {
    const email = req.body.email
    User
        .findOne({email:email},(error,user)=>{
            if (error) {
                return ErrorHandler(error,req,res);
            }
            console.log("User with this email found in the database");
            ResetPassword
                .findOneAndDelete({userId: user.id},(error,resetPassword)=>
                {
                    console.log("If any previous entry of reset password for same user then it is deleted");
                    token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
                    ResetPassword.create({
                        userId: user.id,
                        resetPasswordToken:token,
                        },(error,resetPassword)=>{
                            if (error)
                                return ErrorHandler(error,req,res);
                            else
                            {
                                console.log("New user reset token created ",resetPassword);
                                console.log(config.google_password);
                                console.log(config.google_username);
                                let transporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                      user: config.google_username,
                                      pass: config.google_password,
                                    }
                                });

                                transporter.verify(function(error, success) {
                                    if (error) {
                                      console.log(error);
                                    } else {
                                      console.log("Server is ready to take our messages");
                                    }
                                  });
                                
                                  // send mail with defined transport object
                                transporter.sendMail({
                                    from: '"Spyra App" <positron.eduventures@gmail.com>', // sender address
                                    to: user.email, // list of receivers
                                    subject: "Reset your account password !!", // Subject line
                                    html: '<h4><b>Reset Password</b></h4>' +
                                    '<p>To reset your password, complete this form:</p>' +
                                    '<a href=\"' + "http://localhost:3000/" + 'reset/' + user._id + '/' + token + '\">' + 'http://localhost:3000/reset/' + user.id + '/' + token + '</a>' +
                                    '<br><br>' +
                                    '<p>--Team</p>'
                                  },
                                  (error,response)=>{
                                    if(error)
                                        return ErrorHandler(error,req,res);
                                    else    
                                        return res.status(200).json({success:true,message:"Recovery mail sent..."})
                                  });
                            }
                        })
                    })       
                })
            });
        

router.get('/reset/:userid/:token',(req,res)=>{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile(path.join(__dirname,'../views/forgot-password.html'), null, function (error, data) {
            if (error) {
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            return res.end();
        })
})

router.post('/reset/:userid/:token',(req,res)=>{
    ResetPassword.find((error,docs)=>
    {
        console.log(docs);
        console.log("All the requests");
    })
    ResetPassword.findOne({userId:req.params.userid,resetPasswordToken:req.params.token},(error,resetPassword)=>{
        if(error)
            return ErrorHandler(error,req,res);
        console.log("resetPassword is :",resetPassword);
        if(!resetPassword)
            return ErrorHandler("This Link has been expired ",req,res);
        else    
        {
            User.findOneAndUpdate({_id:req.params.userid},{$set:{password:crypto.createHash('sha256').update(req.body.password).digest('hex')}},(error,user)=>{
                if(error)
                    return ErrorHandler(error,req,res);
                else    
                    return res.redirect('/auth/login');
            })
        }
    })
})

router.get('/reset-password',(req,res)=>{
    return res.sendFile(path.join(__dirname,"../views/reset-password.html"));
})
module.exports=router;