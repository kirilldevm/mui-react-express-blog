import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/errorHandler';
import userRouter from './routes/user.route';

const app = express();

app.use(express.json());

// Routes
app.use('/users', userRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
