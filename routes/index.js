var express = require('express');
var request = require('request')
var lodashTake = require('lodash.take');
var lodashFilter = require('lodash.filter');
var fs = require('fs');
var router = express.Router();

const url = 'https://bostad.stockholm.se/Lista/AllaAnnonser';
const key = fs.readFileSync('./.env');

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(url, function(error, response, body) {
    if (error) {
      res.render('index', {title: 'Failed'});
    }

    const data = lodashTake(lodashFilter(JSON.parse(body), function(match) {
      return match.Stadsdel === 'Högdalen' || match.Stadsdel === 'Bandhagen' || match.Stadsdel === 'Rågsved';
    }), 20);

    const sendurl = 'https://hooks.slack.com/services/' + key;
    const senddata = {
      text: "Test from localhost"
    };
    // request(
    //   {
    //     method: 'post',
    //     body: senddata,
    //     json: true,
    //     url: sendurl,
    //   }, function(error, response, body) {
    //     console.log(error);
    //     console.log(response);
    //   }
    // );
    console.log(sendurl);

    res.render('index', { title: 'Bostad alert', list: data }); 
  })
});

module.exports = router;
