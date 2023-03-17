const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const { HttpError } = require('http-errors');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  console.log(req.file)
  const { path: tempUpload, originalname } = req.file;
  const { _id, email } = req.user;
  const imageName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', imageName);
    const result = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!result) {
      throw HttpError(404, `Not found user with email ${email}`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
