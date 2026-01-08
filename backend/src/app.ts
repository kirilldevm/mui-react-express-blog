import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';

const app = express();

app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
