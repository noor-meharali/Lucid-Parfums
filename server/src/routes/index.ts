import { Router } from 'express';
import healthRoute from './health.route';
import productRoute from './product.route';

const router = Router();

router.use('/health', healthRoute);
router.use('/products', productRoute);

// Mounted as each module is implemented in its dedicated part:
// /auth, /users, /cart, /wishlist, /orders, /reviews, /admin

export default router;
