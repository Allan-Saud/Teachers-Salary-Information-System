const express = require('express');
const router = express.Router();
const emailController = require('../Controller/EmailController');

router.post('/sendemail', emailController.sendEmail);

module.exports = router;
