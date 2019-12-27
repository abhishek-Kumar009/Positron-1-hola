var Question=require('./models').Question;
const express=require('express');
var router=express.Router();
const ErrorHandler=require('../_helpers/error-handler');

router.get('/search',(req,res)=>{
    console.log(req.query);
    Question.find({
        $text: { $search: req.query.text }
      }).limit(10).exec((error,questions)=>{
          if(error)
            return ErrorHandler(error,req,res);
          //return res.json(questions);  


             return res.render('home', {user: req.session.user,questions : questions });

      })
});

module.exports=router;
