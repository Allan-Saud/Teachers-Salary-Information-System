const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');

router.post("/admin",adminController.Admins)
router.get("/adminget",adminController.getAdmin)



module.exports=router;