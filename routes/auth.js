const express = require('express');

const { restart } = require('nodemon');

const router = express.Router();

const {registrationController, loginController} = require('../controllers/auth');

const { ctrlWrapper } = require('../../routes/api/helpers/index');

const { validateBody, validateParams } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.post('/registration', ctrlWrapper(registrationController));

router.post('/login', validateParams, ctrlWrapper(loginController));





module.exports = {auth: router}
