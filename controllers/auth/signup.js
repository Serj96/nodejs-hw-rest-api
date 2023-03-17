const { Conflict } = require('http-errors');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
var Jimp = require('jimp');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`409, Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const avatarSize = Jimp.read(avatarURL)
    .then(avatar  => {
      return avatar
        .resize(250, 250) 
    })
    .catch(err => {
      console.error(err);
    });


  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarSize,
  });

  res.status(201).json({
    Status: 'success',
    code: 201,
    data: {
      user: {
        email: result.email,
        password: result.password,
        avatarURL: result.avatarSize,
      },
    },
  });
};

module.exports = signup;
