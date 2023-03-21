const { Conflict } = require('http-errors');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`409, Email ${email} in use`);
  }

  const msg = {
    to: email,
    from: 'nodehw@meta.ua', // Use the email address or domain you verified above
    subject: 'Thank you for sign up!',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<h1>and easy to do anywhere, even with Node.js</h1>',
  };

  await sgMail.send(msg);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email, { s: '200' });
  


  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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
