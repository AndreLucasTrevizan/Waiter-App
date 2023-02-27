import { Schema } from 'mongoose';

export interface IHandleCreateOrderBody {
  table: string;
}

export type OrderType = {
  _id: Schema.Types.ObjectId,
  table: string;
  status: boolean;
  draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}
