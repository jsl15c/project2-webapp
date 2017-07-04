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

router.post('/analysis', (req, res, next) => {
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
      const newData = new DataModel ({
        // add values from .analyze() to data model
        label:response.sentiment.document.label,
        score:response.sentiment.document.score
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
              res.redirect('/');
            }
          });
        }
      });
    }
  });
});
});
module.exports = router;
