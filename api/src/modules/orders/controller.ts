import { Request, Response } from 'express';
import { IHandleCreateOrderBody } from '../../@types/order';
import { OrdersModel } from './models/Order';

export const handleCreateOrder = async (req: Request, res: Response) => {
  const { table } = req.body as IHandleCreateOrderBody;

  const order = await OrdersModel.create({ table });

  return res.json(order);
};

export const handleListOpenedOrders = async (req: Request, res: Response) => {
  const orders = await OrdersModel.find({ draft: false, status: false });

  return res.json(orders);
};

export const handleConfirmingOrder = async (req: Request, res: Response) => {
  const { order_id } = req.query;

  const order = await OrdersModel.findByIdAndUpdate(order_id, { $set: { draft: false } });

  return res.json(order);
};

export const handleFinishOrder = async (req: Request, res: Response) => {
  const { order_id } = req.query;

  const order = await OrdersModel.findByIdAndUpdate(order_id, { $set: { status: true } });

  return res.json(order);
};
