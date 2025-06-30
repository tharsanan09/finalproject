import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String
  }
}, { 
  timestamps: true
});

// URL-இற்கான slug உருவாக்குதல்
categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

export const Category = mongoose.model('Category', categorySchema);