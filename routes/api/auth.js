const express = require('express');

const { ctrlWrapper } = require('../../routes/api/helpers');

const { validateBody, auth } = require('../../middlewares/index');
const {
  getCurrent,
  login,
  logout,
  signup,
} = require('../../controllers/auth/index');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');
const router = express.Router();

router.post('/signup',  validateBody(joiSignupSchema), ctrlWrapper(signup));

router.post('/login',  validateBody(joiLoginSchema), ctrlWrapper(login));

router.get('/current', auth, ctrlWrapper(getCurrent));

router.post('/logout', auth,  ctrlWrapper(logout));


module.exports = router;
