import { Request, Response } from 'express';
import { User } from '../models/user.model';
import {
  BadRequestException,
  InternalException,
  NotFoundException,
} from '../middlewares/errors';
import bcrypt from 'bcryptjs';

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password) {
    throw new BadRequestException('Missing required fields');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw new InternalException('Failed to create user');
  }
  res.status(201).json({ user: { id: user._id, name, email } });
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find({}).select('-password');

  if (!users) {
    throw new NotFoundException('Users not found');
  }

  res.status(200).json({ users });
}

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestException('Invalid password');
  }

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    message: 'Login successful',
  });
}
