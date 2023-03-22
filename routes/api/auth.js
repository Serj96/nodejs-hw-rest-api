const express = require('express');

const { ctrlWrapper } = require('../../routes/api/helpers');

const { validateBody, auth, upload } = require('../../middlewares/index');
const {
  getCurrent,
  login,
  logout,
  signup,
  updateAvatar,
  verifyEmail 
} = require('../../controllers/auth/index');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');
const router = express.Router();

router.post('/signup', validateBody(joiSignupSchema), ctrlWrapper(signup));

router.get('/verify/:verificationCode',  ctrlWrapper(verifyEmail);

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(login));

router.get('/current', auth, ctrlWrapper(getCurrent));

router.post('/logout', auth, ctrlWrapper(logout));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(updateAvatar)
);

  

module.exports = router;
