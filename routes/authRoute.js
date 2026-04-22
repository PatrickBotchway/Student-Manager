const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/authController')
const { validateFields } = require('../middleware/authValidation')

router.post('/register', validateFields, registerUser)



module.exports = router;