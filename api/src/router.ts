import { Request, Response, Router } from 'express';
import { CategoryRouter } from './modules/categories/router';
import { ItemRouter } from './modules/items/router';
import { OrderRouter } from './modules/orders/router';
import { ProductRouter } from './modules/products/router';
import { UserRouter } from './modules/users/router';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  return res.json({ msg: '🚀 API Waiter Manager Running' });
});

router.use(
  UserRouter,
  CategoryRouter,
  ProductRouter,
  OrderRouter,
  ItemRouter
);

export default router;
