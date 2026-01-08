import express from 'express';
import {
  createUser,
  getAllUsers,
  signin,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', createUser);
userRouter.post('/signin', signin);

export default userRouter;
