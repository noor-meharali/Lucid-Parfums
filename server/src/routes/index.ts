import { Router } from 'express';
import healthRoute from './health.route';
import productRoute from './product.route';
import reviewRoute from './review.route';

const router = Router();

router.use('/health', healthRoute);
router.use('/products', productRoute);
router.use('/reviews', reviewRoute);

// Mounted as each module is implemented in its dedicated part:
// /auth, /users, /cart, /wishlist, /orders, /admin

export default router;
