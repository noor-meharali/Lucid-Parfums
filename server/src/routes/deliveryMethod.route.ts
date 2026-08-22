import { Router } from 'express';
import { listDeliveryMethods } from '../controllers/deliveryMethod.controller';

const router = Router();

router.get('/', listDeliveryMethods);

export default router;
