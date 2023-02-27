import { Schema, model } from 'mongoose';
import { ProductType } from '../../../@types/products';

const ProductsSchema = new Schema<ProductType>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
}, { timestamps: true });

export const ProductsModel = model<ProductType>('Product', ProductsSchema);
