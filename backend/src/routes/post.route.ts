import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
} from '../controllers/post.controller';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getPostById);

export default postRouter;
