const ErrorHandler=require("../_helpers/error-handler");
const User=require('./models').User;
const express=require('express');
const router=express.Router();

router.get('/userinfo/:userId',(req,res)=>
{
    User.findOne({_id:req.params.userId}).populate('branch').exec((error,user)=>
    {
        if(!error)
        {
            var userinfo={
                firstname:user.firstname,// to store name of the user
                lastname:user.lastname,
                username:user.username,
                email:user.email,
                rating:user.rating,
                branch:user.branch,
                points:user.points,
                profileImage:user.profileImage,
                description:user.description
            }
            return res.json(userinfo);
        }
        else 
            return ErrorHandler(error,req,res);
    });
})

module.exports=router;
