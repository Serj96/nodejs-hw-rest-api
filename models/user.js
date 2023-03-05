const { Schema, model } = require('mongoose');
const Joi = require('joi');

// const { handleSchemaValidationErrors } = require('../routes/api/helpers');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
});

// contactSchema.post('save', handleSchemaValidationErrors);

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .required(),
//   phone: Joi.string().required(),
//   favorite: Joi.bool(),
// });

// const updateFavoritSchema = Joi.object({ favorite: Joi.bool().required() });

// const schemas = {
//   addSchema,
//   updateFavoritSchema,
// };
const User = model('user', userSchema);

module.exports = {
  User,
//   schemas,
};
