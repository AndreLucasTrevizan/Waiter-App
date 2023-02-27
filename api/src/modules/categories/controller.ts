import { Request, Response } from 'express';
import { IHandleCreateCategoryBody } from '../../@types/category';
import { CategoriesModel } from './models/Category';

export const handleCreateCategory = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body as IHandleCreateCategoryBody;

  const category = await CategoriesModel.create({ name });

  return res.json(category);
};

export const handleListCategories = async (
  req: Request,
  res: Response
) => {
  const categories = await CategoriesModel.find({}).select('_id, name');

  return res.json(categories);
};
