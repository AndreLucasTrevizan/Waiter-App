import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { handleCreateProduct, handleListProducts } from './controller';

const router = Router();

router
  .route('/products')
  .all(isAuthenticated)
  .post(handleCreateProduct)
  .get(handleListProducts);

export {router as ProductRouter};
