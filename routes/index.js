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

module.exports = router;
