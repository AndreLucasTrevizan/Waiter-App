import { Schema } from 'mongoose';

export interface IHandleCreateProductBody {
  name: string;
  description: string;
  category_id: string;
}

export type ProductType = {
  _id: Schema.Types.ObjectId,
  name: string,
  description: string,
  category_id: Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
};
