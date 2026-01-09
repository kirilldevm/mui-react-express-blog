import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';
import cors from 'cors';

const app = express();

const urls = process.env.FRONTEND_URLS || 'http://localhost:3000';

app.use(
  cors({
    origin: [urls],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
