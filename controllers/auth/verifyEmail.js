const { User } = require('../../models/user');
const { HttpError } = require('http-errors');

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: '',
  });

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
