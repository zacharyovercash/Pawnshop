const router = require('express').Router();
const passport = require('passport');
const bodyParser=require('body-parser');
const User = require('../models/user-model');
const bcrypt= require('bcrypt');

var urlencodedParser=bodyParser.urlencoded({extended:false});
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user,});
});

router.post('/login',urlencodedParser,
  passport.authenticate('local',{successRedirect:'/profile',failureRedirect:'/auth/login'}),
  function(req, res) {
    res.redirect('/profile');
  });

router.get('/register', (req, res) => {
    res.render('register', { user: req.user});
});

router.post('/register',urlencodedParser, (req, res) => {

  var newUser=new User({
    username:req.body.username,
    email:req.body.email,
    FirstName:req.body.first,
    LastName:req.body.last,
    password:req.body.password
  });


  User.findOne({username: req.body.username}, function(err, user) {
    if (err) { return done(err); }
    if (user) {
      res.redirect('/auth/register');
    }
    else{
      newUser.save(function(err){
    if(err){
      console.log(err);
    } else{
      req.login(newUser,function(err){
        if(err){
          console.log(err);
        }
        return res.redirect('/profile');
      });
    }
  });
    }
  })
});


// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
