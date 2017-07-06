const express = require('express');

const router = express.Router();

const UserModel = require('../models/user-model.js');

const DataModel = require('../models/data-model.js');

// -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎- WATSON API -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎
const NLUV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
// -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎- WATSON API -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎
const nlu = new NLUV1({
  username: '087339cb-ebf4-44f6-b8c8-636d3f1d0dba',
  password: 'wlI1hF2O5Gmh',
  version_date: NLUV1.VERSION_DATE_2017_02_27
});


router.get('/dashboard', (req, res, next) => {
    if (req.user) {
      res.render('user-views/dashboard.ejs');
    }
    res.redirect('/');
});


router.post('/dashboard', (req, res, next) => {
  // credentials for new object
  const criteria = {
    html:req.body.userEntry,
    features:{'sentiment':{}}
  };

  // get model to current user
  UserModel.findById(req.user._id, (err, userInfo) => {
    if (err) {
      next(err);
      return;
    }

  // ibm watson function that returns a JSON object
  // with label and score keys
  nlu.analyze(criteria, (err, response) => {
    if (err) {
      console.log('error: ' + err);
      next(err);
      return;
    }
    else {
      var d = new Date();
      var mm;
      var dd = d.getDay();
      var yyyy = d.getFullYear();
      switch (d.getMonth()) {
        case 0:
          mm = "January";
        break;
        case 1:
          mm = "February";
        break;
        case 2:
          mm = "March";
        break;
        case 3:
          mm = "April";
        break;
        case 4:
          mm = "May";
        break;
        case 5:
          mm = "June";
        break;
        case 6:
          mm = "July";
          break;
        case 7:
          mm = "August";
          break;
        case 8:
          mm = "September";
          break;
        case 9:
          mm = "October";
          break;
        case 10:
          mm = "November";
          break;
        case 11:
          mm = "December";
          break;
      }
      today = mm + ' ' + dd + ', ' + yyyy;

      const newData = new DataModel ({

        // add values from .analyze() to data model
        entry:req.body.userEntry,
        label:response.sentiment.document.label,
        score:response.sentiment.document.score,
        date:today
      });


      // save new values into newData
      newData.save((err) => {
        if (err) {
          // error handling
          next(err);
          return;
        }
        else {
          console.log('🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕');
          // add data from newData into
          // UserModel
          userInfo.data.push(newData);
          console.log(userInfo);
          console.log('');
          // save userInfo to store new
          // information
          userInfo.save((err) => {
            if (err){
              // error handling
              next(err);
              return;
            }
            else {
              // redirect to analysis page
              res.redirect('/analysis');
            }
          });
        }
      });
    }
  });
});
});

router.get('/analysis', (req, res, next) => {
  let userScores = [];
  if (req.user) {
    userScores = req.user.data.map(datum => datum.score);
    res.locals.userScoresBack = userScores;
    res.locals.postDate = today;
    res.render('user-views/analysis.ejs');
  }
  res.redirect('/');
});


module.exports = router;
