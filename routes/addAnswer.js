const multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/answerAttachments')
    },
    filename: function (req, file, cb) {
        const originalnameList=file.originalname.split('.');
        const extension=originalnameList[originalnameList.length-1];
        cb(null, file.fieldname + '-' + Date.now()+'.'+extension);
    }
  });
   
var upload = multer({ storage: storage });
const {body, validationResult}=require('express-validator/check');
const {sanitizeBody}=require('express-validator/filter');
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();
const required=require('./loginmiddlewares').required;
const User=require('./models').User;
const Question=require('./models').Question;
const Answer=require('./models').Answer;


var answer_post=
[
    upload.array('attachments'),

    body('answer').isLength({min:1}).withMessage('Answer field is empty'),

    sanitizeBody('answer').trim().escape(),
    
    (req,res)=>
    {
        console.log('Request made by user ',req.user);

        const errors=validationResult(req);
        if(!errors.isEmpty())
        {   
            return ErrorHandler(errors,req,res);
        }
        
        else
        {
        Question.findByIdAndUpdate(req.params.questionId,{$inc:{numAnswers:1}}, function (err, question) {
        
            if (err) 
               return ErrorHandler(err,req,res);
            if(!question)
                return ErrorHandler("No such question found",req,res);
            console.log('question saved',question);
            //console.log('req.user =',req.user);
            User.findByIdAndUpdate(req.user._id,{$inc:{points:question.points}},(err,user)=>{
                if(err)
                    return  ErrorHandler(err,req,res);
                if(!user)
                    return ErrorHandler("No such user found",req,res);

                var attachmentslist=[];
                if (req.files) {
                    for(var i=0;i<req.files.length;i++)
                        attachmentslist.push(req.files[i].filename);  
                        }
                let answer=new Answer({
                                    answer:req.body.answer,
                                    questionId:question._id,
                                    givenBy:user._id,
                                    upvotes:0,
                                    downvotes:0,
                                    attachments:attachmentslist,
                                    embededlinks:req.body.embededlinks,
                                    datestring:""
                                    });
                                                
                answer.save((error,results)=>
                    {
                        if(error)
                        {
                            return ErrorHandler(error,req,res);
                        }
                        else
                        {
                            console.log("Answer added ",results);
                            res.status(200).end('Answer added successfully');	
                        }
                    });
                })
            })
        }        
    }
];
router.post('/post-answer/:questionId',required,answer_post);

module.exports=router;
