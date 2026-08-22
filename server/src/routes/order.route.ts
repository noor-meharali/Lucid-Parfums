import { Router } from 'express';
import { createOrder, listOrders, getOrder } from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/requireAuth';
import { authRateLimiter } from '../middleware/rateLimit';
import { createOrderSchema, orderListQuerySchema } from '../validators/order.validator';

const router = Router();

router.use(requireAuth);

router.post('/', authRateLimiter, validate(createOrderSchema), createOrder);
router.get('/', validate(orderListQuerySchema, 'query'), listOrders);
router.get('/:orderNumber', getOrder);

export default router;
