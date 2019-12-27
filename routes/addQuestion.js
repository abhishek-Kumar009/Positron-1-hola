const Question=require("./models").Question;

const multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/questionAttachments')
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

var question_post=
[
    upload.array('attachments'),

    body('questionHeading').trim().isLength({min:1}).withMessage('Question Heading field is empty'),

    // body('questionDescription').trim().isLength({min:1}).withMessage('Question Description field is empty'),

    sanitizeBody('questionHeading').trim().escape(),

    // sanitizeBody('questionDescription').trim().escape(),

    (req,res)=>
    {

        const errors=validationResult(req);

        if(!errors.isEmpty())
        {
            console.log("Validation Errors");
            console.log(errors);
            var Error={
                isError:true,
                message:errors.array()
            }
            return ErrorHandler(Error,req,res);
        }
        else
        {
            //console.log(req);
            var attachmentslist=[];
            if (req.files) {
            for(var i=0;i<req.files.length;i++)
                attachmentslist.push(req.files[i].filename);

            console.log("Attachment names are",attachmentslist);
            }
            let question=new Question({
                questionHeading:req.body.questionHeading,
                // questionDescription:req.body.questionDescription,
                points:2,
                views:0,
                followers:0,
                attachments:attachmentslist,
                numAnswers:0,
                //topic:req.body.topic,
                askedBy:req.user._id,
                subject:req.body.subject,
                //chapter:req.body.chapter,
                });

            console.log('Question to be added is',question);
                question.save((error,results)=>
                {
                    if(error)
                    {
                        return ErrorHandler(error,req,res);
                    }
                    else
                    {
                        console.log("Question successfully added",results);
                        res.status(200).end('Question added successfully');
                    }
                });
            };
    }
];

router.use(required);
router.post('/post-question',question_post);

module.exports=router;
