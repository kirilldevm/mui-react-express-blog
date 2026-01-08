import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { NotFoundException } from '../middlewares/errors';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find({});

  if (!users) {
    throw new NotFoundException('Users not found');
  }

  res.status(200).json(users);
}
