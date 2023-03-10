const express = require('express');

const { ctrlWrapper } = require('../../routes/api/helpers');

const { validateBody, auth } = require('../../middlewares');
const {
  getCurrent,
  login,
  logout,
  signup,
  updateSubscription,
} = require('../../controllers/auth/index');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');
const router = express.Router();

router.post('/signup', validateBody(joiSignupSchema), ctrlWrapper(signup));

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(login));

router.get('/current', auth, ctrlWrapper(getCurrent));

router.get('/logout', auth, ctrlWrapper(logout));

router.patch('/', auth, ctrlWrapper(updateSubscription));

module.exports = router;
