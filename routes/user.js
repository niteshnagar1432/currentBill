const express = require('express');
const { DefaultController } = require('../controller/UserController');
const router = express()

router.get('/',DefaultController);

module.exports = router;