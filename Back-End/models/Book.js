import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedDate: { type: Date, default: Date.now },
  imageUrl: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);