const express = require('express');

const { ctrlWrapper } = require('./helpers/index');
const { validateBody, auth } = require('../../middlewares/index');
const { auth: ctrl } = require('../../controllers/index');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');
const router = express.Router();

router.post('/signup', validateBody(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/', ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
