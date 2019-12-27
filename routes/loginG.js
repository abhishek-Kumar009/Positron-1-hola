'use strict';

const express=require('express');
const config = require('../config');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User=require('./models').User;
const ErrorHandler=require('../_helpers/error-handler');

function extractProfile(profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
    email:profile.emails[0],
  };
}

passport.use(
  new GoogleStrategy(
    {
      clientID: config.OAUTH2_CLIENT_ID,
      clientSecret: config.OAUTH2_CLIENT_SECRET,
      callbackURL: config.OAUTH2_CALLBACK,
      accessType: 'offline',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId:profile.id},(error,user)=>{
        if(error)
        {
          console.log("error");
          return done(error,false)
         // return ErrorHandler(error,req,res);
        }
        else
        {
          if(user)
            return done(null, user)
          else
          {
            const extractedUserProfile=extractProfile(profile);
            //console.log("extracted profile is ",extractedUserProfile);
            const newGoogleUser=new User(
              {
                username:extractedUserProfile.displayName,
                profileImage:extractedUserProfile.image,
                email:extractedUserProfile.email.value,
                points:0,
                notifications:[],
                following:[],
                googleId:extractedUserProfile.id,
              }
            );
            newGoogleUser.save((error,user)=>{
              if(error)
                {
                  console.log(error)
                  return done(error,false);
                }
              else 
              {
                return done(null, user);
              }
            })
          }
        }

      })
    })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((_id, done) => {
  User.findById(_id, function(err, user) {
    done(err, user);});
});

const router = express.Router();


router.get('/auth/google',passport.authenticate('google', {scope: ['email', 'profile']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>
{
  //console.log('google authentication completed'+req.user)
  
        req.session.user = req.user;
        res.locals.user = req.user;
      res.redirect('/home');
});

module.exports = {
  extractProfile: extractProfile,
  router: router,
};