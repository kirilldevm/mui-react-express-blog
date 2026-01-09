import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';
import cors, { CorsOptions } from 'cors';

const app = express();

const allowedOrigins: string[] = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mui-react-express-blog-five.vercel.app',
  process.env.FRONTEND_URL as string,
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // 1. Allow internal/Postman requests
    if (!origin) return callback(null, true);

    // 2. Check if the origin is in our list OR is a Vercel preview link
    const isAllowed = allowedOrigins.includes(origin);
    const isVercelPreview = origin.endsWith('.vercel.app');

    if (isAllowed || isVercelPreview) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Apply CORS to everything
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
