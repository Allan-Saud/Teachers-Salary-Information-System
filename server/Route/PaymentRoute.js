const express = require('express');
const router = express.Router();
const paymentController = require('../Controller/PaymentController');

router.post('/payment', paymentController.createPayment);

module.exports=router;
