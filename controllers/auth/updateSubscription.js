const { User } = require('../../models/user');
const {HttpError} = require('../../routes/api/helpers');

const updateSubscription = async (req, res, next) => {
  const { _id, email} = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Not found user with email ${email}`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
