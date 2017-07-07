const express = require('express');
const router  = express.Router();
const UserModel = require('../models/user-model.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user) {
      res.redirect('/dashboard');
    }
    res.render('default-views/home.ejs');
});

// router.get('/dashboard', (req, res, next) => {
//     res.locals.userScoresBack = userScores;
//     if (req.user) {
//       userScores = req.user.data.map(datum => datum.score);
//       res.render('user-views/dashboard.ejs');
//     }
//     res.redirect('/');
// });


module.exports = router;
