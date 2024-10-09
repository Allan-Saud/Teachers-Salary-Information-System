const express = require('express');
const router = express.Router();
const registerController = require('../Controller/RegisterController');
const {upload}=require("../app") 
const path =require('path');


// Registration route

router.post('/register',upload.single("image"),registerController.registerUser);

// Get user 
router.get('/getuser', registerController.getUser);


router.get('/getuser/:username', registerController.getUserData);


function middleWare(req, res, next) {
    console.log("This is a route check!");
    next();
}


router.patch('/updateuser/:username',upload.single('image'), registerController.updateUser);




router.delete('/deleteuser/:username', registerController.deleteUser);

router.get('/Images/:filename', async (req, res, next) => {
    const filepath = req.params.filename;
  
  const rootDirectory = path.join(__dirname, '..',  'Images');

    res.sendFile(filepath, { root: rootDirectory }, (err) => {
        if (err) {
       
            return res.status(404).json('File not found');
        } 
    });
});

module.exports = router;


