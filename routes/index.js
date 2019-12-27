
const path=require('path');
//const Chapter=require('./models').Chapter;
const Branch=require('./models').Branch;
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();




router.get('/', function(req, res) {
    Branch.find({},(error,branches)=>{
        if(error)
            return   res.render('index', {locals: {chapters: []}});
        else
        {
            return res.render('index', {locals: {chapters: branches}});
        }
    })
});


module.exports=router;
