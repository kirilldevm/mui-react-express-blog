import mongoose from 'mongoose';

const mongoDB = process.env.MONGO_URL || 'your_connection_string';

export async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
}
