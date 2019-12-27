const Models=require("./models.js");
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();
const dateString=require('../_helpers/addDateString')
const dateStringObject=require('../_helpers/addDateStringObject');
const isFollowedObject=require('../_helpers/isFollowedObject');



router.get('/answer-of-question/:questionId',(req,res)=>
{
    var questionId=req.params.questionId;

    var question_answer_obj={};
    
    Models.Question.findById(questionId).populate('subject').populate('askedBy').exec((error,question)=>{
        if(error)
            return ErrorHandler(error,req,res);

        if(!question)
            return ErrorHandler("Question not found in the database",req,res);

        question.views=question.views+1;
        question.save((error,question)=>{
            if(error)
                return ErrorHandler(error,req,res);

            question=dateStringObject(question);
            question=isFollowedObject(question,req);;
            question_answer_obj.question=question;

            Models.Answer.find({questionId:questionId}).populate('givenBy').exec((error,answers)=>
            {
                if(!error)
                    {
                        answers=dateString(answers);
                        question_answer_obj.answers=answers;
                    //return res.json(question_answer_obj);
                    return res.render('answer-of-question', {user: req.session.user,data : question_answer_obj });
                }
                else    
                    return ErrorHandler(error,req,res);
            })
        })
    })
})




module.exports=router;
