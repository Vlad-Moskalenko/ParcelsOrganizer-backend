const { Schema, model } = require('mongoose');
const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const parcelSchema = new Schema(
  {
    location: {
      type: String,
      required: [true, 'Set parcel location'],
    },
    destination: {
      type: String,
      required: [true, 'Set parcel destination'],
    },
    type: {
      type: String,
      required: [true, 'Set parcel type'],
    },
    date: {
      type: String,
      required: [true, 'Set date of dispatch'],
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

parcelSchema.post('save', handleMongooseError);

const Parcel = model('parcel', parcelSchema);

const orderSchema = Joi.object({
  location: Joi.string().required(),
  destination: Joi.string().required(),
  type: Joi.string().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
});

const deliverSchema = Joi.object({
  location: Joi.string().required(),
  destination: Joi.string().required(),
  date: Joi.string().required(),
});

const schemas = {
  orderSchema,
  deliverSchema,
};

module.exports = {
  Parcel,
  schemas,
};
