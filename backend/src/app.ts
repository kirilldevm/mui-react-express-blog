import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/', (req, res) => res.send('Hello World!'));

// Global error handler
app.use(errorHandler);

export default app;
