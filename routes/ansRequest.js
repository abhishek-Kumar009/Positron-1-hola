const Question=require('./models.js').Question;
const Branch=require('./models').Branch;
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();
const required=require('./loginmiddlewares').required;

const ansRequest=(req,res)=>
{
    Branch.findById(req.user.branch).exec((error,branch)=>{
        if(error)
            return ErrorHandler(error,req,res);
        Question.find({subject:{$in:branch.subjects}}).sort({numAnswers:1}).limit(20).exec((error,questions)=>
        {
            if(!error)
            {
                return res.json(questions);
            }
            else 
            {
                return ErrorHandler(error,req,res);
            }
        })
    })
}

router.get('/answer-requested',required,ansRequest);

module.exports=router;