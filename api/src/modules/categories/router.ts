import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { handleCreateCategory, handleListCategories } from './controller';

const router = Router();

router
  .route('/categories')
  .all(isAuthenticated)
  .post(handleCreateCategory)
  .get(handleListCategories);

export {router as CategoryRouter};