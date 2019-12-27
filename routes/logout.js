const express=require('express');
const router=express.Router();
const required=require('./loginmiddlewares').required;

router.get('/auth/logout',required, (req, res) => {
  req.session.destroy(function(err){
     req.logout();
     res.redirect('/');

  })
})
  //   req.logout();
  //   return res.redirect('/');
  // });

module.exports=router;
