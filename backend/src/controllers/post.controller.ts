import { Request, Response } from 'express';
import { BadRequestException, NotFoundException } from '../middlewares/errors';
import { Post } from '../models/post.model';
import { postSchema } from '../schemas/post.schema';

export async function getAllPosts(req: Request, res: Response) {
  const posts = await Post.find({});

  if (!posts) {
    throw new NotFoundException('Posts not found');
  }

  res.status(200).json({ posts });
}

export async function createPost(req: Request, res: Response) {
  const post = req.body;

  const isValidData = postSchema.safeParse(post);

  console.log(isValidData.error);

  if (!isValidData.success) {
    throw new BadRequestException(isValidData.error.message);
  }

  const newPost = await Post.create(post);

  if (!newPost) {
    throw new BadRequestException('Failed to create post');
  }

  res.status(201).json({ post: newPost });
}
