const express = require('express');
const router = express.Router();
const user = require('../controller/userController');
const auth = require('../middleware/auth');


router.post('/reg',user.userReg)
router.post('/login',user.userLogin)

module.exports = router;