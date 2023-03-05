const { register, login } = require('../services/authServices');

const registerController = async (req, res) => {
  const { email, password } = req.body
  const result = await register(email, password);
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: result,
    },
  });
}

const loginController = async (req, res) => { };

module.export = {
  registerController,
  loginController,
};