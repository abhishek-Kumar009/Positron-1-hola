const User =require("./models").User;
const ErrorHandler=require("../_helpers/error-handler");
const express=require('express');
const router=express.Router();
const Question=require("./models").Question;
const dateString=require('../_helpers/addDateString');
const isFollowed=require('../_helpers/isFollowed')
const Branch=require('./models').Branch;

function provide_questions(req,res)
{
    if(req.user)
    {   
        console.log(req.user.questions);
        Branch.findById(req.user.branch).exec((error,branch)=>{
            if(error)
                return ErrorHandler(error,req,res)
            Question.find({_id:{$nin:req.user.questions},subject:{$in:branch.subjects}}).limit(10).populate('subject').populate('askedBy').exec((error,questions)=>
            {
                if(error)
                    return ErrorHandler(error,req,res);
                Array.from(questions).forEach((question)=>{
                    req.user.questions.push(question._id);
                })
                req.user.save((error,user)=>{
                    if(error)
                        return ErrorHandler(error,req,res);
                    console.log('user questions updated',user);
                    questions=dateString(questions);
                    questions=isFollowed(questions,req);
                    //return res.status(200).json(questions);
                    return res.render('home', {user: req.session.user,questions : questions });
                })
            })
        })
    }
    else
    {
        var randomskipper=Math.ceil((Question.estimatedDocumentCount/10)*Math.random());
        Question.find().skip(randomskipper).limit(10).populate('subject').populate('askedBy').exec((error,questions)=>{
            if(error)
                return ErrorHandler(error,req,res);
                
            questions=dateString(questions);
            questions=isFollowed(questions,req);

            //return res.json(questions);
            return res.render('home', {questions : questions });
        })
    }
}

router.get('/questions',provide_questions);

module.exports=router;