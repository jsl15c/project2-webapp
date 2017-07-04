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

  nlu.analyze(criteria, (err, response) => {
    if (err) {
      console.log('error: ' + err);
      next(err);
      return;
    }
    else {

      console.log(response.sentiment.document);
      const newData = new DataModel ({
        label:
      });

      console.log('🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕');
      res.redirect('/');
    }
  });
});

module.exports = router;
