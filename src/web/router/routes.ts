import { Router } from 'express';

import { ProductController } from '../controllers/ProductController';
import { OrderController } from '../controllers/OrderController';
import { AuthController } from '../controllers/AuthController';

import { checkJwt, checkRole } from '../../infrastructure/middleware/auth';

const router = Router();

router.get('/api/products', ProductController.index);
router.get('/api/product/:id', ProductController.show);
router.post('/api/add-product', [checkJwt, checkRole(['admin'])], ProductController.store);
router.put('/api/edit-product/:id', [checkJwt, checkRole(['admin'])], ProductController.update);
router.delete('/api/delete-product/:id', [checkJwt, checkRole(['admin'])], ProductController.destroy);

router.get('/api/orders', OrderController.index);
router.get('/api/order/:id', OrderController.show);
router.post('/api/add-order', OrderController.store);
router.put('/api/edit-order/:id', OrderController.update);
router.delete('/api/delete-order/:id', OrderController.destroy);

router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);

export default router;
