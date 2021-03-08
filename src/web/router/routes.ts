import { Router } from 'express';
import * as productController from '../controllers/ProductController';
import * as orderController from '../controllers/OrderController';

const router = Router();

router.get('/api/products', productController.index);
router.get('/api/product/:id', productController.show);
router.post('/api/add-product', productController.store);
router.put('/api/edit-product/:id', productController.update);
router.delete('/api/delete-product/:id', productController.destroy);

router.get('/api/orders', orderController.index);
router.get('/api/order/:id', orderController.show);
router.post('/api/add-order', orderController.store);
router.put('/api/edit-order/:id', orderController.update);
router.delete('/api/delete-order/:id', orderController.destroy);

export default router;
