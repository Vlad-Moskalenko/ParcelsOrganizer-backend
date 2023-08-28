const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/parcels');

const { validateBody } = require('../../middlewares');
const { isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/parcel');

router.get('/', authenticate, controllers.getParcelsList);

router.get('/:id', authenticate, isValidId, controllers.getParcelById);

router.post('/order', authenticate, validateBody(schemas.parcelSchemaJoi), controllers.addParcel);

router.delete('/:id', authenticate, isValidId, controllers.removeParcel);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.parcelSchemaJoi),
  controllers.updateParcel
);

module.exports = router;
