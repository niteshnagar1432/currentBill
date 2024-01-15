const express = require('express');
const { DefaultController } = require('../controller/BankController.js');
const { checkToken } = require('../controller/MiddleWare.js');
const { allActivity, getBankActivity, getOneActivity, getActivitiesByDateRange } = require('../controller/ActivityController.js');
const router = express();


router.get('/',DefaultController);
router.get('/one/:activityId',checkToken,getOneActivity);
router.get('/all',checkToken,allActivity);
router.get('/bank/:bankId',checkToken,getBankActivity);
router.get('/date',checkToken,getActivitiesByDateRange);


module.exports = router;
