var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET users listing. */
// router.get('/', userController.index);
router.get('/create', userController.userCreate);
router.get('/', userController.userList);

module.exports = router;
