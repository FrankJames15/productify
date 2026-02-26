import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import * as productController from '../controllers/product.controller.ts';

const router = Router();

// GET /api/products/ (public) - get all products
router.get("/", productController.getAllProducts);

// GET /api/products/my (private) - get current user's products
router.get("/my", requireAuth(), productController.getMyProducts);

// GET /api/products/:id (public) - Get product by ID
router.get("/:id", productController.getProductById);

// POST /api/products/ (private) - create/add new product
router.post("/", requireAuth(), productController.addProduct);

// PUT /api/products/:id (private) - update product
router.put("/:id", requireAuth(), productController.updateProduct)

// DELETE /api/products/:id (private) - delete product by ID
router.delete("/:id", requireAuth(), productController.deleteProduct);

export default router;