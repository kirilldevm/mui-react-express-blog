import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/post.controller';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getPostById);
postRouter.post('/:id', updatePost);

export default postRouter;
