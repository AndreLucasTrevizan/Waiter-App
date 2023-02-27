import { Schema } from 'mongoose';

export interface SerializedUser {
  _id: Schema.Types.ObjectId,
  name: string,
  email: string,
  createdAt: Date,
  updatedAt: Date
}

export type UserType = SerializedUser & {
  password: string;
  serialize: () => SerializedUser;
  comparePassword: (password: string) => boolean;
};

export interface Payload {
  _id: string,
  name: string,
  email: string
}

export interface IHandleCreateUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IHandleLoginBody {
  email: string;
  password: string;
}
