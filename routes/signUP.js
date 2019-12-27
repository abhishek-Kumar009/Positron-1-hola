const User=require('./models.js').User;
const {body, validationResult}=require('express-validator/check');
const {sanitizeBody}=require('express-validator/filter');
const crypto=require('crypto');
const ErrorHandler=require('../_helpers/error-handler');
const express=require('express');
const router=express.Router();
const path=require('path');
var multer = require('multer');
var upload = multer({ dest: './public/assets/images' })


var signup_post=
[
    upload.none(),

    body('username').isLength({min:1}).trim().withMessage('Username field is empty').isAscii('Name of the user must only consist of alphabets'),

    body('firstname').isLength({min:1}).trim().withMessage('First Name field is empty').isAscii('Name of the user must only consist of alphabets'),

    body('lastname').isLength({min:1}).trim().withMessage('First Name field is empty').isAscii('Name of the user must only consist of alphabets'),

    body('email').isEmail().withMessage('Not a valid email').trim().normalizeEmail(),

    body('password').isLength({min:8}).withMessage('Password length must have atleast 8 characters').trim().isAscii().withMessage('Invalid characters entered'),

    body('confirmation_password').isLength({min:8}).withMessage('Password length must have atleast 8 characters').trim().isAscii().withMessage('Invalid characters entered'),

    body('username').custom(value=>{
        return User.findOne({username:value}).then(user => {
            if (user) {
              return Promise.reject('Username already in use');
            }
        })
    }),

    body('email').custom(value=>{
        return User.findOne({email:value}).then(user=>{
            if (user) {
                return Promise.reject('Email already in use');
              }
          })
    }),

    body('password').custom((value, { req })=>{
        if(value!=req.body.confirmation_password)
        {
            throw new Error('Password confirmation is incorrect');
        }
    return true;
   }),

    sanitizeBody('email').trim().escape(),

    sanitizeBody('firstname').trim().escape(),

    sanitizeBody('lastname').trim().escape(),

    sanitizeBody('password').escape().trim(),

    sanitizeBody('username').trim().escape(),

    (req,res)=>
    {
        console.log(req.body);
        const errors=validationResult(req);

        if(!errors.isEmpty())
        {
            console.log("An invalid attempt by a user to signup");
            console.log(errors);
            var Error={
                isError:true,
                message:errors.array()
            }
            return ErrorHandler(Error,req,res);
        }
        else
        {
            let user=new User(
                {
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    username:req.body.username,
                    password:crypto.createHash('sha256').update(req.body.password).digest("hex"),
                    email:req.body.email,
                    branch:req.body.branch,
                    joinDate:Date.now(),
                    notifications:[],
                    following:[],
                    points:0,
                });
            /*
            if(req.body.aspirant=='no')
                user.aspirant=false;
            else
                user.aspirant=true;
            */
            console.log('Saving a new User');

            user.save((error,result)=>
                {
                    if(error)
                        {
                        console.log(error);
                        return ErrorHandler(error,req,res);
                        }
                    else
                        {
                        console.log("User successfully added",result);
                        req.login(result, function(err) {
                            if (err) { return ErrorHandler(err,req,res); }
                            req.session.user = user;
                            res.locals.user = user;
                            console.log("The user is logged in too")
                            return res.status(200).json(result);
                            // return res.redirect('/home');
                          });
                        }
                });
        }
    }
];
// are

router.post('/signup',signup_post);
router.get('/signup',(req,res)=>
 {
     return res.sendFile(path.join(__dirname,'../views/signup.html'));
 })

module.exports=router;
