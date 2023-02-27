import { Schema } from 'mongoose';

export interface IHandleAddItemBody {
  amount: number,
  description?: string,
  product_id: Schema.Types.ObjectId,
  order_id: Schema.Types.ObjectId,
}

export type ItemsType = {
  _id: Schema.Types.ObjectId;
  amount: number;
  description?: string;
  product_id: Schema.Types.ObjectId;
  order_id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
