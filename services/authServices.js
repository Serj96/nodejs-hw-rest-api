const { User } = require('../models/user');
const bcrypt = require('bcrypt');

// const { HttpError } = require('../routes/api/helpers/index');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });
  user.save();
};

const login = async (req, res, next) => {};

// const removeContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     message: 'Contact deleted',
//     data: {
//       result,
//     },
//   });
// };

// const addContact = async (req, res, next) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result,
//     },
//   });
// };

// const updateContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };

// const updateStatusContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };

module.exports = {
  register,
  login,
  // removeContact,
  // addContact,
  // updateContact,
  // updateStatusContact,
};
