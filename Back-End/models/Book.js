import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedDate: { type: Date, default: Date.now },
  imageUrl: String,
  // i add
  isAvailable: { type: Boolean, default: true },
    currentRental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  },
    rentalHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }]
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);