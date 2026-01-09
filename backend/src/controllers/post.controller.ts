import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export const getAllPosts = async (req: Request, res: Response) => {
  let posts;
  try {
    posts = await Post.find().populate('user');
  } catch (err) {
    return console.log(err);
  }

  if (!posts) {
    return res.status(500).json({ message: 'Unexpected Error Occurred' });
  }

  return res.status(200).json({ posts });
};
export const createPost = async (req: Request, res: Response) => {
  const { title, description, location, date, image, user } = req.body;

  if (
    !title &&
    title.trim() === '' &&
    !description &&
    description.trim() === '' &&
    !location &&
    location.trim() === '' &&
    !date &&
    !user &&
    !image &&
    image.trim() === ''
  ) {
    return res.status(422).json({ message: 'Invalid Data' });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  let post;

  try {
    post = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.posts.push(post as any);
    await existingUser.save({ session });
    post = await post.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: 'Unexpected Error Occurred' });
  }
  return res.status(201).json({ post });
};

export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: 'No post found' });
  }
  return res.status(200).json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, location, image } = req.body;

  if (
    !title &&
    title.trim() === '' &&
    !description &&
    description.trim() === '' &&
    !location &&
    location.trim() === '' &&
    !image &&
    image.trim() === ''
  ) {
    return res.status(422).json({ message: 'Invalid Data' });
  }

  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: 'Unable to update' });
  }
  return res.status(200).json({ message: 'Updated Successfully' });
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  let post;
  const MAX_RETRIES = 3;
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      post = await Post.findById(id).populate('user');

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      (post.user as any).posts.pull(post);
      await (post.user as any).save({ session });
      post = await Post.findByIdAndDelete(id);
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
      attempts += 1;
      console.log(`Attempt ${attempts} failed:`, err);

      if (attempts >= MAX_RETRIES) {
        return res
          .status(500)
          .json({ message: 'Unable to delete after retries' });
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
};
