import { Router } from 'express';
import healthRoute from './health.route';
import productRoute from './product.route';
import reviewRoute from './review.route';
import authRoute from './auth.route';
import usersRoute from './users.route';

const router = Router();

router.use('/health', healthRoute);
router.use('/products', productRoute);
router.use('/reviews', reviewRoute);
router.use('/auth', authRoute);
router.use('/users', usersRoute);

// Mounted as each module is implemented in its dedicated part:
// /cart, /wishlist, /orders, /admin

export default router;
