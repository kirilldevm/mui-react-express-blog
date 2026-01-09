import { Request, Response } from 'express';
import { BadRequestException, NotFoundException } from '../middlewares/errors';
import { Post } from '../models/post.model';
import { postSchema, updatePostSchema } from '../schemas/post.schema';

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
    throw new BadRequestException(
      'Failed to create post',
      isValidData.error.message,
    );
  }

  const newPost = await Post.create(post);

  if (!newPost) {
    throw new BadRequestException('Failed to create post');
  }

  res.status(201).json({ post: newPost });
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestException('Post ID is required');
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new NotFoundException('Post not found');
  }

  res.status(200).json({ post });
}

export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestException('Post ID is required');
  }

  const post = req.body;

  const isValidData = updatePostSchema.safeParse(post);

  if (!isValidData.success) {
    throw new BadRequestException(
      'Failed to update post',
      isValidData.error.message,
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  if (!updatedPost) {
    throw new NotFoundException('Post not found');
  }

  res.status(200).json({ post: updatedPost });
}
