const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');

// Registration route
router.post('/users', UserController.Users);
router.get('/getusers', UserController.getUsers);
router.get('/users/:id', UserController.getIndividual);
router.patch('/updateusers/:id', UserController.updateUsers);
// router.delete('/deleteuser/:username', UserController.deleteUser);




module.exports = router;
