var express = require('express');
var router = express.Router();
const getData = require('../external/getData');

/* GET home page. */
router.get('/', function (req, res, next) {
    getData()
        .then(d => res.render('index', { title: 'Bostad alert', list: d }));
});

module.exports = router;
