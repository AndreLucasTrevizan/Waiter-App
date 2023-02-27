import { Schema, model } from 'mongoose';
import { OrderType } from '../../../@types/order';

const OrderSchema = new Schema<OrderType>({
  table: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
  },
  draft: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const OrdersModel = model<OrderType>('Order', OrderSchema);
