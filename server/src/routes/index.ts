import { Router } from 'express';
import healthRoute from './health.route';

const router = Router();

router.use('/health', healthRoute);

// Mounted as each module is implemented in its dedicated part:
// /auth, /users, /products, /categories, /cart, /wishlist, /orders, /reviews, /admin

export default router;
