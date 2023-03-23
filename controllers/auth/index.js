const getCurrent = require('./getCurrent');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
  getCurrent,
  login,
  logout,
  signup,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};