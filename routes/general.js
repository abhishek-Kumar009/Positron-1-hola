const User =require("./models").User;
const ErrorHandler=require("../_helpers/error-handler");
const express=require('express');
const router=express.Router();
const path=require('path');
const Question=require("./models").Question;
const dateString=require('../_helpers/addDateString');
const Branch=require('./models').Branch
const isFollowed=require('../_helpers/isFollowed')
const queue=[];


router.get('/home',(req,res)=>{

    req.user = req.session.user;
    if(req.user)
    {
        console.log(req.user.questions);
        Branch.findById(req.user.branch).populate('subjects').exec((error,branch)=>{
            if(error)
                return ErrorHandler(error,req,res)
            Question.find({_id:{$nin:req.user.questions},subject:{$in:branch.subjects}}).limit(10).populate('subject').populate('askedBy').exec((error,questions)=>
            {
                if(error)
                    return ErrorHandler(error,req,res);
                Array.from(questions).forEach((question)=>{
                    queue.push(question._id);
                    // req.user.questions.push(question._id);
                })

                User.update({_id:req.user._id},{$push:{questions:queue}}).exec((error,user)=>{
                    if(error)
                        return ErrorHandler(error,req,res);
                    console.log('user questions updated',user);
                    questions=dateString(questions);
                    // questions=isFollowed(questions,req);
                    //return res.status(200).json(questions);
                    console.log("rendering home.ejs")
                    return res.render('home', {user: req.session.user,questions : questions ,branches:[], branch:branch, subjects : branch.subjects});

                    // return res.redirect("/homepage")
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
            return res.render('home.ejs', {questions : questions, branch:branch, subjects : branch.subjects });
        })
    }

})
router.get('/',(req,res)=>{
  Branch.find({},(error,branches)=>{
      if(error){
        console.log("BRANCHES ERROR");
        return res.render('index', {user: req.session.user, branches:[] });
      }
      else
      {
                  console.log(branches);
          return res.render('index',{user: req.session.user, branches: branches});
      }
  })

})

module.exports=router;
