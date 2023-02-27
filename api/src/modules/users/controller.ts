import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { IHandleCreateUserBody, IHandleLoginBody } from '../../@types/users';
import { UsersModel } from './models/Users';

export const handleCreateUser = async (
  req: Request,
  res: Response
) => {
  const { name, email, password } = req.body as IHandleCreateUserBody;

  if (name === '' || email === '' || password === '') throw new Error('Preencha todos os campos');

  const user_exists = await UsersModel.findOne({ email });

  if (user_exists) throw new Error('Email já está em uso');

  const user = await UsersModel.create({ name, email, password });

  return res.json(user.serialize());
};

export const handleLogin = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body as IHandleLoginBody;

  const user_exists = await UsersModel.findOne({ email });

  console.log(user_exists?.comparePassword(password));

  if (user_exists && user_exists.comparePassword(password)) {
    const token = sign({
      _id: user_exists?._id,
      name: user_exists?.name,
      email: user_exists?.email,
    }, String(process.env.JWT_SECRET));
  
    return res.json({ ...user_exists.serialize(), token });
  }

  throw new Error('Email ou senha invalidos');
};

export const handleGettingUserDetails = async (
  req: Request,
  res: Response
) => {
  const user = await UsersModel.findOne({ _id: req.user._id });

  return res.json(user?.serialize());
};
