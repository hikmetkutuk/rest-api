import { Router } from 'express';
import * as productController from '../controllers/ProductController';

const routes = Router();

routes.get('/api/products', productController.index);
routes.get('/api/product/:id', productController.show);
routes.post('/api/add-product', productController.store);
routes.put('/api/edit-product', productController.update);
routes.delete('/api/delete-product/:id', productController.destroy);

export default routes;
