const express=require('express');
const router=express.Router();
const Branch=require('./models').Branch;
//const Topic=require('./models').Topic;
const Subject=require('./models').Subject;
const ErrorHandler=require('../_helpers/error-handler');

router.post('/addSubjectToBranch',(req,res)=>
{
    Subject.findOne({name:req.body.subject_name},(error,subject)=>{
        if(error)
            return ErrorHandler(error,req,res)
        if(!subject)
            return ErrorHandler("no such subject found",req,res)
        Branch.updateOne({name:req.body.branch_name},{ $push: { subjects: subject._id } },(error,branch)=>{
            if(error)
                return ErrorHandler(error,req,res)
            console.log("LINE 01")
            console.log(branch.name);
            console.log(subject.name);
            return res.status(200).end('subject added to branch');
        })
    })
})


router.post('/addBranch',(req,res)=>{
    console.log(req.body.name)
    console.log("before entering create")
    Branch.create({
        name:req.body.name,
        subjects:[]
    },(error,branch)=>
    {
        console.log(branch);
        if(error)
            return ErrorHandler(error,req,res);
        else
            return res.status(200).end("Branch added");
    })
    console.log("created")
})

router.post('/addSubject',(req,res)=>{
    console.log(req.body.name)
    Subject.create({
        name:req.body.name,
    },(error,subject)=>
    {
        console.log(subject);
        if(error)
            return ErrorHandler(error,req,res);
        else
            return res.status(200).end("Subject added");
    })
})

module.exports=router;
