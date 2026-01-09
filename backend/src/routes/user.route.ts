import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  signin,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/signup', createUser);
userRouter.post('/signin', signin);

export default userRouter;
