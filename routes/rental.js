var express = require('express');
var router = express.Router();

var rentalController = require('../controllers/rentalController');

/* GET rentals. */
// router.get('/', rentalController.index);
router.get('/create', rentalController.rentalCreate);
router.post('/create', rentalController.rentalCreate);
router.get('/', rentalController.rentalList);
router.get('/:id', rentalController.rentalDetail);
router.get('/search/:search', rentalController.rentalSearch);
router.post('/search/:search', rentalController.rentalSearch);

module.exports = router;
