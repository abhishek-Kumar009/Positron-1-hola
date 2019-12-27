const express=require('express');
var router=express.Router();
var Answer=require('./models').Answer;
const ErrorHandler=require('../_helpers/error-handler');
const required=require('./loginmiddlewares').required;

router.get('/upvote/:answer_id',required,(req,res)=>{
    Answer.findById(req.params.answer_id,(error,answer)=>
    {
        if(error)
            return ErrorHandler(error,req,res);
        if(!answer)
            return ErrorHandler("No such answer found",req,res);
        answer.upvotes=answer.upvotes+1;
        answer.save((error,results)=>{
            if(error)
                return ErrorHandler(error,req,res);
            else
                return res.status(200).end('You Upvoted this answer');
        })
    })
})


router.get('/downvote/:answer_id',required,(req,res)=>{
    Answer.findById(req.params.answer_id,(error,answer)=>
    {
        if(error)
            return ErrorHandler(error,req,res);
        if(!answer)
            return ErrorHandler("No such answer found",req,res);
        answer.downvotes=answer.downvotes+1;
        answer.save((error,results)=>{
            if(error)
                return ErrorHandler(error,req,res);
            else
                return res.status(200).end('You Downvoted this answer');
        })
    })
})

module.exports=router;