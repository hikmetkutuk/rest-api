import { Router } from 'express';
import * as productController from '../controllers/ProductController';

const routes = Router();

routes.get('/products', productController.index);
    
export default routes;

