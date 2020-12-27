import { Router } from 'express';
import * as productController from '../controllers/ProductController';
import * as orderController from '../controllers/OrderController';

const routes = Router();

routes.get('/api/products', productController.index);
routes.get('/api/product/:id', productController.show);
routes.post('/api/add-product', productController.store);
routes.put('/api/edit-product/:id', productController.update);
routes.delete('/api/delete-product/:id', productController.destroy);

routes.get('/api/orders', orderController.index);
routes.get('/api/order/:id', orderController.show);
routes.post('/api/add-order', orderController.store);
routes.put('/api/edit-order/:id', orderController.update);
routes.delete('/api/delete-order/:id', orderController.destroy);

export default routes;
