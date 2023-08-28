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
    },
    date: {
      type: String,
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

const parcelSchemaJoi = Joi.object({
  parcelType: Joi.string().required(),
  location: Joi.string().required(),
  destination: Joi.string().required(),
  type: Joi.string(),
  date: Joi.string(),
  description: Joi.string(),
});

const schemas = {
  parcelSchemaJoi,
};

module.exports = {
  Parcel,
  schemas,
};
