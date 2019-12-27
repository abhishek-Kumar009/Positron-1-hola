const express=require('express');//, es6Renderer = require('express-es6-template-engine');   //express is used to create a server

const bodyParser=require('body-parser'); //to parser the contents of the request body

const mongoose=require('mongoose'); //an object oriented document handler

mongoose.set('bufferCommands', false);

var multer = require('multer'); //for multi content request body

const fs=require('fs'); //for internal file handling

const logger=require('morgan'); //for attractive display of logs

const {body, validationResult}=require('express-validator/check');  //for validating the contents enters

const {sanitizeBody}=require('express-validator/filter');   //for filtering malicious contents in request body

var session=require('express-session'); //for user login sessions

const config = require('./config.json');

const secret = config.secret;

const passport=require('passport');

mongoose.connect('mongodb+srv://Positron:spyra1234@cluster0-2239v.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

// mongoose.connect('mongodb+srv://positron:Spyra+98712@cluster0-vb2so.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

mongoose.connection.on('error',(error)=>{
    console.log("error =",error);
});


const addTemplate=require('./routes/loginmiddlewares').addTemplate;

const app=express();    //creating the server

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session(
    {   secret:secret,
        resave:true,
        saveUninitialized:true,
        name:'login',
        cookie:{expire:100000}
    })
);

// Load view engine

const path=require('path');
//app.engine('html', es6Renderer);
app.set('views', __dirname +'/views/');

require('dotenv').config();

//app.set('view engine', 'html');
app.set('view engine', 'ejs');

app.use(passport.initialize());

app.use(passport.session());

app.use(logger('dev'));

app.locals.baseURL = "askspyra.com";

app.use(require('./routes/loginmiddlewares').addTemplate);
app.use(require('./routes/search'));
app.use(require('./routes/general'));
app.use(require('./routes/signUP'));
app.use(require('./routes/trending'));
app.use(require('./routes/answer'));
app.use(require('./routes/clearData'));
app.use(require('./routes/addFollowing'));
app.use(require('./routes/answerOptions'));
app.use(require('./routes/login'));
app.use(require('./routes/loginG').router);
app.use(require('./routes/loginL'));
app.use(require('./routes/forgetPassword'));
app.use(require('./routes/subjects'));
app.use(require('./routes/branches'))
app.use(require('./routes/userinfo'));
app.use(require('./routes/questions'));
app.use(require('./routes/logout'));
app.use(require('./routes/addAnswer'));
app.use(require('./routes/addData'));
app.use(require('./routes/addQuestion'));
app.use(require('./routes/ansRequest'));
app.use(require('./routes/addUnfollowing'));

port = process.env.PORT || 3000
app.listen(port);

console.log('Server is listening');
