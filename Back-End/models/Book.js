import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
   rentprice: {
    type: Number,
    required: true,
    default: 0 // Default price if not provided
  },

  isbn: {
    type: String,
    required: true,
    unique: true, // Ensure ISBN is unique
    
  },
 
  description: {
    type: String
  },
  publishedDate: {
    type: Date
  },
  
  language: {
    type: String,
    default: 'Tamil'
  },
  
  imageUrl: {
    type: String // Image path or URL
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rentPeriod: {
    type: Number,
    default: 14 // Default rent period in days
  },
  latePeriod: {
    type: Number,
    default: 0 // Default late period (can be used to calculate penalty)
  },
  lateFee: {
    type: Number,
    default: 0 // Default fee for late return
  },
  currentRental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }
}, 


{
  timestamps: true,
  id: false,
 toJSON: {
  virtuals: true,
transform: function (doc, ret) {
  ret.Book_id = ret._id;
  delete ret._id;
  delete ret.__v;

  // Optional: move Book_id to top, but keep all fields
  const reordered = {
    Book_id: ret.Book_id,
    ...ret
  };

  return reordered;
}
 }
});

export const Book = mongoose.model('Book', bookSchema);
