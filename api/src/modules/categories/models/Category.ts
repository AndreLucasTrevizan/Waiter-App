import { Schema, model } from 'mongoose';
import { CategoryType } from '../../../@types/category';

const CategorySchema = new Schema<CategoryType>({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const CategoriesModel = model<CategoryType>('Category', CategorySchema);
