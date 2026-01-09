import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/post.controller';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getPostById);
postRouter.post('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
