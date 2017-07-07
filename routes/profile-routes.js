const express = require('express');

const router = express.Router();

const UserModel = require('../models/user-model.js');

const DataModel = require('../models/data-model.js');

router.get('/profile', (req, res, next) => {
  if (req.user) {
    res.render('user-views/profile.ejs', {
      profile_img:req.user.photo,
      email:req.user.email
    });
  }
  res.redirect('/');
});

router.post('/profile/:myId/update', (req, res, next) => {
        UserModel.findByIdAndUpdate(req.params.myId,
          {
            email:req.body.email
          },
          (err, userFromDb) => {
            console.log('🛑 🛑 🛑 🛑 🛑 🛑 🛑 🛑');
            console.log(req.body.email);
            console.log('🛑 🛑 🛑 🛑 🛑 🛑 🛑 🛑');
            if(err) {
              next(err);
              return;
            }

            res.redirect('/analysis');

          }
        );
});


module.exports = router;
