import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { handleConfirmingOrder, handleCreateOrder, handleFinishOrder, handleListOpenedOrders } from './controller';

const router = Router();

router
  .route('/orders')
  .all(isAuthenticated)
  .post(handleCreateOrder)
  .get(handleListOpenedOrders);

router.route('/orders/confirm').patch(isAuthenticated, handleConfirmingOrder);
router.route('/orders/finish').patch(isAuthenticated, handleFinishOrder);

export {router as OrderRouter};
