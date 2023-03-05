const express = require('express');

const { restart } = require('nodemon');

const router = express.Router();

const {
  registerController,
  loginController,
} = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../routes/api/helpers/index');

const { validateBody, validateParams } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.post('/register', ctrlWrapper(registerController));

router.post('/login', validateParams, ctrlWrapper(loginController));





module.exports = {auth: router}
