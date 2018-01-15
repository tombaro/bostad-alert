var express = require('express');
var router = express.Router();
const getData = require('../external/getData');

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = getData.data();
    res.render('index', { title: 'Bostad alert', list: data });
});

module.exports = router;
