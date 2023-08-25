const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/parcels');

const { validateBody } = require('../../middlewares');
const { isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/parcel');

router.get('/', authenticate, controllers.getParcelsList);

router.get('/:id', authenticate, isValidId, controllers.getParcelById);

router.post('/order', authenticate, validateBody(schemas.orderSchema), controllers.addParcel);

router.post('/deliver', authenticate, validateBody(schemas.deliverSchema), controllers.addParcel);

router.delete('/:id', authenticate, isValidId, controllers.removeParcel);

router.put(
  '/order/:id',
  authenticate,
  isValidId,
  validateBody(schemas.orderSchema),
  controllers.updateParcel
);

router.put(
  '/deliver/:id',
  authenticate,
  isValidId,
  validateBody(schemas.deliverSchema),
  controllers.updateParcel
);

module.exports = router;
