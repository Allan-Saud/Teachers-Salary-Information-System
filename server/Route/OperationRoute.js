const express = require('express');
const router = express.Router();
const OperationController = require('../Controller/OperationController');
// const multer=require("multer");
// // const upload=require("../app.js")
// const user=require("../Model/RegisterSchema.js")

router.post("/calculations",OperationController.calculateSalary)

router.get("/get_calculations/:username",OperationController.getAllSalaries)
//router.get("/get_calculations/:username",OperationController.getAllSalariesdetail)



router.get("/get_calculations_level",OperationController.getSalariesByLevel)
router.get("/get_individual_calculations/:username/:name/:objectId", OperationController.getSalaryByName);
router.patch("/update_calculations/:username/:name/:objectId",OperationController.updateSalary)






module.exports=router;


