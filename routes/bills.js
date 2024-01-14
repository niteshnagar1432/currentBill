const express = require('express');
const { DefaultController } = require('../controller/BankController');
const { checkToken } = require('../controller/MiddleWare');
const { createBill, allBills } = require('../controller/BillContoller');
const router = express();

router.get('/',DefaultController);
router.get('/bills',checkToken,allBills);
router.post('/create',checkToken,createBill);

module.exports = router;