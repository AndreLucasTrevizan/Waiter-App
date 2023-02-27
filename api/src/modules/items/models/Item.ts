import { Schema, model } from 'mongoose';
import { ItemsType } from '../../../@types/items';

const ItemsSchema = new Schema<ItemsType>({
  amount: {
    type: Number,
    default: 1
  },
  description: {
    type: String,
    required: false,
  },
  product_id: {
    type: String,
    required: true,
    ref: 'Product'
  },
  order_id: {
    type: String,
    required: true,
    ref: 'Order'
  }
}, { timestamps: true });

export const ItemsModel = model<ItemsType>('Item', ItemsSchema);
