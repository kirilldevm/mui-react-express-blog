import express from 'express';
import { createUser, getAllUsers } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);

export default userRouter;
