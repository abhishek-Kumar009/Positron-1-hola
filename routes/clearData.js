const express=require('express');
var router=express.Router();
var Model=require('./models');
const ErrorHandler=require('../_helpers/error-handler');

router.get('/clear_users',(req,res)=>{
    Model.User.deleteMany({},(error)=>{
        if(error)
            return ErrorHandler(error,req,res);
        else
            return res.status(200).end('Users Cleared Successfully');
    })
})

router.get('/clear_questions',(req,res)=>{
    Model.Question.deleteMany({},(error)=>{
        if(error)
            return ErrorHandler(error,req,res);
        else
            return res.status(200).end('Questions Cleared Successfully');
    })
})

router.get('/clear_answers',(req,res)=>{
    Model.Answer.deleteMany({},(error)=>{
        if(error)
            return ErrorHandler(error,req,res);
        else
            return res.status(200).end('Answers Cleared Successfully');
    })
})


// router.get('/delete_subject',(req,res)=>{
//     Model.Subject.deleteOne({},(error)=>{
//         if(error)
//             return ErrorHandler(error,req,res);
//         else
//             return res.status(200).end('Answers Cleared Successfully');
//     })
// })


module.exports=router;
