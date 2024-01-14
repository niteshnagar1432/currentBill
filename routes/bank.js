const express = require('express');
const { DefaultController, addBank, addBalance } = require('../controller/BankController');
const { checkToken } = require('../controller/MiddleWare');
const router = express();

router.get('/',DefaultController);
router.post('/add',checkToken,addBank);
router.post('/add/balance',checkToken,addBalance);

module.exports = router;