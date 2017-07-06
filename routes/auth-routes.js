const express = require('express');

const bcrypt = require('bcrypt');

const router = express.Router();

const UserModel = require('../models/user-model.js');

router.get('/signup', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }
  else {
    res.render('auth-views/signup-view.ejs');
  }
});

router.post('/signup', (req, res, next) => {
  // if username or password are empty display an error
  if (req.body.email === '' || req.body.email === '') {
    res.render('auth-views/signup-view.ejs', {
      invalidMsg:'Please provide both username and password'
    });
  }
  // else check if username is taken
  UserModel.findOne({email:req.body.email},
    (err, userInfo) => {
    if (userInfo) {
      res.render('auth-views/signup-view.ejs',
      {
        invalidMsg:'Sorry, that email is already in use.'
      });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserModel({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      encryptedPassword:scrambledPassword
    });
    newUser.save((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  });
});
// END REGISTRATION

const passport = require('passport');

// START LOG IN
router.get('/login', (req, res, next) => {
  if (req.user) {
    res.redirect('/dashboard');
  }
  else {
    res.render('auth-views/login-view.ejs');
  }
});

router.post('/login', passport.authenticate(
  'local', // 1st arg -> name of strategy (determined by the strategy's npm package)
  {   // 2nd arg -> settings object
    successRedirect:'/dashboard',
    failureRedirect:'/login'
  }
));
// END LOG IN

// LOG OUT ROUTES
router.get('/logout', (req, res, next) => {
// req.logout() functioned is defined by the passport middleware (app.js)
  req.logout();
  res.redirect('/');
});


// SOCIAL LOGINS ---------------------------------------------------------------------
router.get('/auth/facebook', passport.authenticate('facebook'));    // where user goes when they login
router.get('/auth/facebook/callback',                               // where user goes after login
  passport.authenticate(
    'facebook', // name of strategy
    {           // settings object
      successRedirect:'/',
      failureRedirect:'/login'
    }
  ));


  router.get('/auth/google',
    passport.authenticate(
      'google', // name of strategy
      {           // settings object
        scope:[
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read'
         ],

      }
    ));

router.get('/auth/google/callback',
  passport.authenticate(
    'google', // name of strategy
    {           // settings object
      successRedirect:'/',
      failureRedirect:'/login'
    }
  ));

// END SOCIAL LOGINS ---------------------------------------------------------------------

module.exports = router;
