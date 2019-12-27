const express=require('express');
var router=express.Router();
var Question=require('./models').Question;
var User=require('./models').User;
const ErrorHandler=require('../_helpers/error-handler');
const required=require('./loginmiddlewares').required;

router.get('/add-following/:question_id',required,(req,res)=>{
    Question.findById(req.params.question_id,(error,question)=>{
        if(error)
            return ErrorHandler(error,req,res);
        if(!question)
            return ErrorHandler("No such question found",req,res);
        question.followers=question.followers+1;
    
        User.findOneAndUpdate({_id:req.user._id},{$push: {following:question._id }},(error,user)=>{
            if(error)
                return ErrorHandler(error,req,res);
            else    
                console.log(user);
                return res.status(200).end("Followed Questions updated");
        })  
    })
})

module.exports=router;