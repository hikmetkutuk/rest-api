import { Router } from 'express';

import * as productController from '../controllers/ProductController';
import * as orderController from '../controllers/OrderController';
import * as authController from '../controllers/AuthController';

import { checkJwt } from '../../middleware/auth';

const router = Router();

router.get('/api/products', productController.index);
router.get('/api/product/:id', productController.show);
router.post('/api/add-product', [checkJwt], productController.store);
router.put('/api/edit-product/:id', [checkJwt], productController.update);
router.delete('/api/delete-product/:id', [checkJwt], productController.destroy);

router.get('/api/orders', orderController.index);
router.get('/api/order/:id', orderController.show);
router.post('/api/add-order', orderController.store);
router.put('/api/edit-order/:id', orderController.update);
router.delete('/api/delete-order/:id', orderController.destroy);

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

export default router;
