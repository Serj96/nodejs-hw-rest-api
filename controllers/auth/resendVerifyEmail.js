const { User } = require('../../models/user');
const { HttpError } = require('http-errors');
const { sendEmail } = require('../../routes/api/helpers/index');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = User.findOne({ email })

   if (!user) {
     throw HttpError(404, 'Email not found');
   }
   if (user.verify) {
     throw HttpError(400, 'Email already verify');
   }

   const verifyEmail = {
     to: email,
     subject: 'Verify you email',
     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify your email</a>`,
   };

   await sendEmail(verifyEmail);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
}

module.exports = resendVerifyEmail;