import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';
import cors from 'cors';

const app = express();

const allowedOrigins = [
  'https://mui-react-express-blog-five.vercel.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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
