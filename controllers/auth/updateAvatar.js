const fs = require('fs/promises');
const path = require('path');
const {User} = require('../../models/user')

const avatartsDir = path.join(__dirname, '../../', 'public', 'avatarts');

const updateAvatar = async (req, res) => {
    const {_id} = req.user
    const { path: tempUpload, oroginalname } = req.file;
    const resultUpload = path.join(avatartsDir, oroginalname);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', oroginalname);
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.status(201).json({
      Status: 'success',
      code: 201,
      data: {
        user: {
          avatarURL: avatarURL,
        },
      },
    });
};

module.exports = {
  updateAvatar,
};
