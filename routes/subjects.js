const Branch=require('./models').Branch;
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();

router.get('/subjects/:branchId',(req,res)=>
{
 
    Branch.findById(req.params.branchId).populate('subjects').exec((error,subjects)=>{
        if(error)
            return ErrorHandler(error,req,res);
        else
        {
            return res.json(subjects);
        }
    })
})


module.exports=router;
