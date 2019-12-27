const Models=require('./models.js');
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();
const Question=Models.Question;
const dateString=require('../_helpers/addDateString');
const isFollowed=require('../_helpers/isFollowed');
const Branch=Models.Branch;


router.get('/trending',(req,res)=>
{
    Question.find().estimatedDocumentCount((error,count)=>{
        console.log("Question Count is ",count);
        var randomskipper=Math.ceil((count/50*Math.random()));
        console.log("Random Skipper for questions is ",randomskipper);
        Models.Question.find().skip(randomskipper).limit(10).populate('subject').populate('askedBy').exec((error,questions)=>{
            if(error)
                return ErrorHandler(error,req,res);
            else{
              questions=dateString(questions);
              questions=isFollowed(questions,req);
              return res.render('home', {user: req.session.user,questions : questions, branches: [] });

            }


            //return res.json(questions);
        })
    });
})
module.exports=router;
