import { Request, Response } from 'express';
import { IHandleAddItemBody } from '../../@types/items';
import { ItemsModel } from './models/Item';

export const handleAddItemToOrder = async (req: Request, res: Response) => {
  const {
    amount,
    description,
    order_id,
    product_id
  } = req.body as IHandleAddItemBody;

  const item = await ItemsModel.create({
    amount,
    description,
    order_id,
    product_id
  });

  return res.json(item);
};

export const handleDeleteItemFromOrder = async (req: Request, res: Response) => {
  const { order_id, product_id } = req.query;

  const removed_item = await ItemsModel.findOneAndDelete({ order_id, product_id });

  return res.json(removed_item);
};

export const handleListOrderItems = async (req: Request, res: Response) => {
  const { order_id } = req.query;

  const items = await ItemsModel.find({ order_id }).populate([
    {
      path: 'product_id',
      select: 'name'
    }
  ]).select('_id amount product_id order_id');

  return res.json(items);
};
