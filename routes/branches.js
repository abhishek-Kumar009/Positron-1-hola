const Branch=require('./models').Branch;
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();

router.get('/branches',(req,res)=>
{
    Branch.find({}).populate('subjects').exec((error,branches)=>{
        if(!error)
            return  res.json(branches);
        else
            return ErrorHandler(error,req,res);
    })
})


module.exports=router;