import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BadRequestException, NotFoundException } from '../middlewares/errors';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
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

  const user = await User.findById(post.author);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const newPost = await Post.create(post);

  if (!newPost) {
    throw new BadRequestException('Failed to create post');
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  // await user.updateOne({ $push: { posts: newPost._id } });
  user.posts.push(newPost._id);
  await user.save({ session });
  await newPost.save({ session });
  await session.commitTransaction();

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

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestException('Post ID is required');
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    throw new NotFoundException('Post not found');
  }

  const user = await User.findById(post.author);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  await user.updateOne({ $pull: { posts: post._id } }, { session });
  await post.deleteOne({ session });
  await session.commitTransaction();

  res.status(200).json({ message: 'Post deleted successfully' });
}
