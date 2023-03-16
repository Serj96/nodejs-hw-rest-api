// const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../routes/api/helpers/index');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = ' ' } = req.headers;
  const [bearer, token] = authorization.split('');
  try {
    if (bearer !== 'Bearer' || !token) {
      // throw new Unauthorized("Not authorized");
      next(HttpError(401));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      // throw new Unauthorized("Not authorized");
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid sugnature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
