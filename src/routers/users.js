

const express = require('express')
const router = express.Router()
router.use(express.json())


//Middlewares
const { validateUserRegistration, validateUserLogin } = require('../middlewares/userValidation')

//Handlers
const { registerUser, loginUser } = require('../controllers/userhandler')

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);


module.exports = router;