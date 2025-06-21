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
   bookprice: {
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
  pages: {
    type: Number
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
}, {
  timestamps: true,
  id: false,
 toJSON: {
  virtuals: true,
  transform: function (doc, ret) {
    ret.Book_id = ret._id;
    delete ret._id;
    delete ret.__v;

    // Reorder fields: move Book_id to the top
    const reordered = {
      Book_id: ret.Book_id,
      title: ret.title,
      author: ret.author,
      isbn: ret.isbn,
      description: ret.description,
      publishedDate: ret.publishedDate,
      language: ret.language,
      imageUrl: ret.imageUrl,
      isAvailable: ret.isAvailable,
      rentPeriod: ret.rentPeriod,
      latePeriod: ret.latePeriod,
      lateFee: ret.lateFee,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt
    };

    return reordered;
  }
}
});

export const Book = mongoose.model('Book', bookSchema);
