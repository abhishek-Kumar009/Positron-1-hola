'use strict'

const express=require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const crypto=require('crypto');
var User=require('./models').User;
const ErrorHandler=require('../_helpers/error-handler');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("reached inside local strategy");
    const hash=crypto.createHash('sha256');
    hash.update(password);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("User Not Found");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.password==hash.digest('hex')) {
        console.log("Password entered is correct");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('user found about to serialize');
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user._id);
  });
  
passport.deserializeUser(function(id, done) {
    console.log('deserializing user')
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
const router = express.Router();

router.post('/auth/local',function(req, res, next) 
{
  console.log('about to start local strategy')
  passport.authenticate('local', function(err, user, info) 
  {
    console.log('Authentication function completed, LETS see the result');
    if(err)
    {
      console.log("some error while user tried to login")
      return ErrorHandler(err,req,res);
    }
    else if(user==false)
    {
      console.log('user not registered yet');
      return res.redirect('/auth/login');
    }
    else
    {
      req.login(user, function(err) {
        if (err) { return ErrorHandler(err,req,res); }
        //return res.json(user);
        req.session.user = user;
        res.locals.user = user;
        return res.redirect('../home');
      });
      
    }
  })(req, res, next);
});

module.exports=router;
