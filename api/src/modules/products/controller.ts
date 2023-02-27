import { Request, Response } from 'express';
import { IHandleCreateProductBody } from '../../@types/products';
import { CategoriesModel } from '../categories/models/Category';
import { ProductsModel } from './models/Products';

export const handleCreateProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    category_id
  } = req.body as IHandleCreateProductBody;

  const product = await ProductsModel.create({
    name,
    description,
    category_id
  });

  return res.json(product);
};

export const handleListProducts = async (req: Request, res: Response) => {
  const { category_id = '' } = req.query;

  let filter = {};

  if (category_id !== '') filter = { ...filter, category_id };

  const products = await ProductsModel.find(filter).select('_id name description');

  return res.json(products);
};
