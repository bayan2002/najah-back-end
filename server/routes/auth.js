const express = require('express');
const {adminRegister, login} = require('../controllers/auth');
const errorCatcher = require('../middlewares/errorCatcher');
const authRouter = express.Router();


authRouter.post('/login', errorCatcher(login));
authRouter.post('/secure-admin-register', errorCatcher(adminRegister)); // remember to delete this route



module.exports = authRouter;