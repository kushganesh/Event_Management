const express = require('express');
const router = express.Router();
const { userRegister, userLogin, UpdateProfile, ForgetPassword,ResetPassword } = require("../controllers/UserControllers")


// Register a new user
router.post('/register', userRegister);

// Login a user
router.post('/login', userLogin);

// Update a user
router.put('/profile/:id', UpdateProfile);


//Forget Password
router.post('/forgot-password', ForgetPassword);

// Reset password route
router.post('/reset-password', ResetPassword);
module.exports = router;