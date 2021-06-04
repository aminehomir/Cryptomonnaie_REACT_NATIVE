const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')





router.post('/add', userController.addUser);

router.get('/usermail/:id', userController.getUserByEmail);








module.exports = router;