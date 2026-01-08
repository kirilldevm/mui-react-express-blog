import mongoose from 'mongoose';
import z from 'zod';

export const postSchema = z.object({
  date: z.coerce.date(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().min(1, 'Image is required'),
  location: z.string().min(1, 'Location is required'),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Author must be a valid ObjectId',
  }),
});
