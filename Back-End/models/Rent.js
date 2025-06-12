import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rentDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['rented', 'returned'],
    default: 'rented',
  }
}, { timestamps: true });

export const Rent = mongoose.model('Rent', rentSchema);
