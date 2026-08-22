import { Router } from 'express';
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } from '../controllers/cart.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/requireAuth';
import { addCartItemSchema, updateCartItemSchema } from '../validators/cart.validator';

const router = Router();

// Every route requires auth, and every service call is scoped to
// req.user.id — there is no way to reach another user's cart, and no
// userId is ever accepted from the request itself.
router.use(requireAuth);

router.get('/', getCart);
router.post('/items', validate(addCartItemSchema), addCartItem);
router.put('/items/:itemId', validate(updateCartItemSchema), updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.delete('/', clearCart);

export default router;
