import { Router } from 'express';
import {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { validate } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import {
  createProductSchema,
  updateProductSchema,
  productListQuerySchema,
} from '../validators/product.validator';

const router = Router();

// Public, read-only.
router.get('/', validate(productListQuerySchema, 'query'), listProducts);
router.get('/:slug', getProductBySlug);

// Admin-only. requireAdmin currently rejects every request until
// real authentication exists — see middleware/requireAdmin.ts.
router.post('/', requireAdmin, validate(createProductSchema), createProduct);
router.put('/:id', requireAdmin, validate(updateProductSchema), updateProduct);
router.delete('/:id', requireAdmin, deleteProduct);

export default router;
