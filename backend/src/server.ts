import app from './app';
import config from './config/config';
import { connectDB } from './db';

app.listen(config.port, () => {
  connectDB();
  console.log(`Server running on port ${config.port}`);
});
