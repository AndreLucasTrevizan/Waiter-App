import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { handleCreateUser, handleGettingUserDetails, handleLogin } from './controller';

const router = Router();

router.route('/users').post(handleCreateUser);

router.route('/login').post(handleLogin);

router.route('/users/me').get(isAuthenticated, handleGettingUserDetails);

export {router as UserRouter};