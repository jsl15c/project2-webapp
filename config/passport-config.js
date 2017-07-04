// we are configuring Passport in a separate file
// to avoid making a mess in app.js
const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model.js');

// serializeUser (controls what goes into the bowl)
//      - save only the user's database ID in the bowl
//      - happens only when you log in
passport.serializeUser((userInfo, next) => {
  next(null, userInfo._id);
  // null in 1st arg means NO ERROR
});

// deserializeUser (controls what you get when you check the bowl)
//      - use the ID in the bowl to retrieve the user's information
//      - happens every time you visit any page on site after logging in
passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(idFromBowl, (err, userInfo) =>{
    if (err) {
      next(err);
    }
    next(null, userInfo);
  });
});

// STRATEGIES --------------------------------------------------
//    different ways of logging in

// SETUP passport-local
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {                              // 1st arg -> settings object
                                 // HAVE TO BE CORRECT SETTING KEY
    usernameField:'email',
    passwordField:'password'
  },
  (formEmail, formPassword, next) => {  // 2nd arg -> callback
                                           //   will be called when a user tries to login
   // #1: is there an account with the provided username?
   //     (is there a user with that username in the database)
   UserModel.findOne(
     {email:formEmail},
     (err, userInfo) => {
       if (err) {
         console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
         next(err);
         return;
       }
       if (userInfo === null) {
         console.log('🛑🛑🛑🛑🛑🏼🏼🏼🏼🏼🏼🏼🏼🏼🛑🛑🛑🛑🛑🛑🛑🛑🏼🏼🏼🏼🏼🏼🏼🏼🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
         // in Passport, if you call the next() with "false", login failed
         next(null, false);
         return;
       }
       // #2: if there is a user with that username, is the password correct?
       if (bcrypt.compareSync(formPassword, userInfo.encryptedPassword) === false) {
         console.log('🖕🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼🏼 🏼 🏼');
         // in Passport, if you call the next() with "false", login failed
         next(null, false);
         return;
       }

       // if we pass those if statements
       next(null, userInfo);
     }
   );
 })
);

// passport-facebook (login with your facebook account)
const FbStrategy = require('passport-facebook').Strategy;
passport.use(new FbStrategy(
  {
    clientID:process.env.myFacebookClientId, // settings object
    clientSecret:process.env.myFacebookClientSecret,
    callbackURL:'/auth/facebook/callback'  // out route - name whatever you want
  },

  (accessToken, refreshToken, profile, next) => { // callback function
    // will be called when a user allows us to log them in with facebook
    console.log('');
    console.log('🌎 🌎 🌎 🌎 🌎 facebook profile info 🌎 🌎 🌎 🌎 🌎');
    console.log(profile);
    console.log('');

    UserModel.findOne(
      {facebookId: profile.id},
      (err, userInfo) => {
        if (err) {
          next(err);
          return;
        }
        // if first time loggin in with fb, userInfo will be empty
        if (userInfo) {
          next(null, userInfo);
          return;
        }

        // if its the first time they log in, SAVE THEM IN THE DB!
        const newUser = new UserModel({
          firstName:profile.displayName.split('')[0],
          lastName:profile.displayName.split('')[1],
          facebookId:profile.Id,
        });
        newUser.save((err) => {
          if (err) {
            next(err);
            return;
          }
          next(null, newUser);
        });
      }
    );
    // Receiving the Facebook user info and SAVING IT!
    //Unless we have already saved their info, in which case we log them in
  }
));


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(
  {
    clientID:process.env.myGoogleClientId, // settings object
    clientSecret:process.env.myGoogleClientSecret,
    callbackURL:'/auth/google/callback' // out route - name whatever you want
  },

  (accessToken, refreshToken, profile, next) => { // callback function
    // will be called when a user allows us to log them in with facebook
    console.log('');
    console.log('🛑 🛑 🛑 🛑 🛑 google profile info 🛑 🛑 🛑 🛑 🛑');
    console.log(profile);
    console.log('');

    UserModel.findOne(
      {googleId: profile.id},
      (err, userInfo) => {
        if (err) {
          next(err);
          return;
        }
        // if first time loggin in with fb, userInfo will be empty
        if (userInfo) {
          next(null, userInfo);
          return;
        }

        // if its the first time they log in, SAVE THEM IN THE DB!
        const newUser = new UserModel({
          firstName:profile.displayName.split('')[0],
          lastName:profile.displayName.split('')[1],
          googleId:profile.Id,
        });

        if (newUser.fullname === undefined) {
          newUser.fullname = profile.emails[0].value;
        }

        newUser.save((err) => {
          if (err) {
            next(err);
            return;
          }
          next(null, newUser);
        });
      }
    );
    // Receiving the Facebook user info and SAVING IT!
    //Unless we have already saved their info, in which case we log them in
  }
));
