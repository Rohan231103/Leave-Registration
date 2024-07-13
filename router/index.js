const express = require('express');
const router = express.Router();
const leave = require('../controller/LeaveController');
const auth = require('../middleware/auth');


router.post('/leaveReg',auth.check_token,leave.leaveReg);
router.put('/update/:id',auth.check_token,leave.UpdateLeave);
router.get('/getLeave', leave.getLeave);
router.get('/cancle/:id',leave.cancleLeave);

module.exports = router;