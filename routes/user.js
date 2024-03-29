const express = require('express');
const { DefaultController, SignIn, SignUp, BankList } = require('../controller/UserController.js');
const { checkToken } = require('../controller/MiddleWare.js');
const router = express()

router.get('/',DefaultController);
router.post('/sign-in',SignIn);
router.post('/sign-up',SignUp);
router.get('/bank',checkToken,BankList);
router.get('/home',checkToken,(req,res)=>{
    res.json({message:"ok"});
})

module.exports = router;