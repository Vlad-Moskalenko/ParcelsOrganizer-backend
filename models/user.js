const { Schema, model } = require('mongoose');
const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Set email'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password'],
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
