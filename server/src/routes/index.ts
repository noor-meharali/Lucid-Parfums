import { Router } from 'express';
import healthRoute from './health.route';
import productRoute from './product.route';
import reviewRoute from './review.route';
import authRoute from './auth.route';
import usersRoute from './users.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import addressRoute from './address.route';
import deliveryMethodRoute from './deliveryMethod.route';
import orderRoute from './order.route';

const router = Router();

router.use('/health', healthRoute);
router.use('/products', productRoute);
router.use('/reviews', reviewRoute);
router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/cart', cartRoute);
router.use('/wishlist', wishlistRoute);
router.use('/addresses', addressRoute);
router.use('/delivery-methods', deliveryMethodRoute);
router.use('/orders', orderRoute);

// Mounted as each module is implemented in its dedicated part:
// /admin

export default router;
