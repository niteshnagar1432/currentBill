const express = require('express');
const { DefaultController, SignIn, SignUp } = require('../controller/UserController');
const router = express()

router.get('/',DefaultController);
router.post('/sign-in',SignIn);
router.post('/sign-up',SignUp);

module.exports = router;