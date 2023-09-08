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
    date: {
      type: String,
      required: [true, 'Set date of dispatch'],
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    parcelType: {
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

const parcelSchemaJoi = Joi.object({
  parcelType: Joi.string().required(),
  location: Joi.string().required(),
  destination: Joi.string().required(),
  date: Joi.string().allow('').required(),
  type: Joi.string().allow(''),
  description: Joi.string().allow(''),
});

const schemas = {
  parcelSchemaJoi,
};

module.exports = {
  Parcel,
  schemas,
};
