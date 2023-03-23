const { nanoid } = require('nanoid');
const { Conflict } = require('http-errors');
const { User } = require('../../models/user');
const { sendEmail } = require('../../routes/api/helpers/index');
const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');

const { BASE_URL } = process.env;


const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`409, Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email, { s: '250' });
  const verificationCode = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify you email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify you link</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    Status: 'success',
    code: 201,
    data: {
      user: {
        email: result.email,
        password: result.password,
        avatarURL: result.avatarURL,
      },
    },
  });
};

module.exports = signup;
