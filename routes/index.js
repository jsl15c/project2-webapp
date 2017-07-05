const express = require('express');
const router  = express.Router();
const UserModel = require('../models/user-model.js');

/* GET home page. */
router.get('/', (req, res, next) => {
    let userScores = [];

    if (req.user) {
      userScores = req.user.data.map(datum => datum.score);
    }

    res.locals.userScoresBack = userScores;
    res.render('index');
});


module.exports = router;





// // -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎- WATSON API -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎
// var NLUV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
//
// // credentials for new object
// var nlu = new NLUV1({
//   username: '087339cb-ebf4-44f6-b8c8-636d3f1d0dba',
//   password: 'wlI1hF2O5Gmh',
//   version_date: NLUV1.VERSION_DATE_2017_02_27
// });
// // -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎- WATSON API -🌎-🌎-🌎-🌎-🌎-🌎-🌎-🌎
//
//
//
//
// var criteria = {
//   // 'html':req.body.journalEntry,
//   'html':req.body.journalEntry,
//   'features':{'sentiment':{}}
// };
//
// nlu.analyze(criteria, (err, response) => {
//      if (err)
//        console.log('error: ' + err);
//      else
//        console.log(response.sentiment.document);
//  });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
