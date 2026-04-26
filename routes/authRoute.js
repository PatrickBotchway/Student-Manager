const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController')
const { validateSignup, validateLogin } = require('../middleware/validation/authValidation')

router.post('/register', validateSignup, registerUser);

router.post('/login', validateLogin, loginUser);



module.exports = router;