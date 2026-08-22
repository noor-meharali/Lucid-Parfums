import { Router } from 'express';
import { listAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/address.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/requireAuth';
import { addressSchema, updateAddressSchema } from '../validators/address.validator';

const router = Router();

router.use(requireAuth);

router.get('/', listAddresses);
router.post('/', validate(addressSchema), createAddress);
router.put('/:id', validate(updateAddressSchema), updateAddress);
router.delete('/:id', deleteAddress);
router.put('/:id/default', setDefaultAddress);

export default router;
