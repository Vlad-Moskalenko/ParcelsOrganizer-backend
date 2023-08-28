const { Parcel } = require('../models/parcel');
const errorHandler = require('../helpers/errorHandler');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getParcelsList = async (req, res) => {
  const parcelsList = await Parcel.find();

  res.status(200).json(parcelsList);
};

const getParcelById = async (req, res) => {
  const parcelById = await Parcel.findById(req.params.id);

  if (!parcelById) {
    throw errorHandler(404, 'Not found');
  }
  res.status(200).json(parcelById);
};

const addParcel = async (req, res) => {
  const { _id: owner } = req.user;
  const parcel = await Parcel.create({ ...req.body, owner });
  res.status(201).json(parcel);
};

const removeParcel = async (req, res) => {
  const removedParcel = await Parcel.findByIdAndRemove(req.params.id);

  if (!removedParcel) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json(removedParcel);
};

const updateParcel = async (req, res) => {
  const updatedParcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedParcel) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json(updatedParcel);
};

module.exports = {
  getParcelsList: ctrlWrapper(getParcelsList),
  getParcelById: ctrlWrapper(getParcelById),
  addParcel: ctrlWrapper(addParcel),
  removeParcel: ctrlWrapper(removeParcel),
  updateParcel: ctrlWrapper(updateParcel),
};
