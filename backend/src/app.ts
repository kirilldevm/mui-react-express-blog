import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';
import cors, { CorsOptions } from 'cors';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mui-react-express-blog-five.vercel.app', // Explicitly added
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Required if you use cookies or Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
