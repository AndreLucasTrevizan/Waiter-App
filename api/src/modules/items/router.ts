import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { handleAddItemToOrder, handleDeleteItemFromOrder, handleListOrderItems } from './controller';

const router = Router();

router
  .route('/items')
  .all(isAuthenticated)
  .post(handleAddItemToOrder)
  .get(handleListOrderItems);

router.route('/items/remove').delete(isAuthenticated, handleDeleteItemFromOrder);

export {router as ItemRouter};
