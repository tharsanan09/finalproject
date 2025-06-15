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
    default: function() {
      const today = new Date();
      const returnDate = new Date(this.rentDate);
      returnDate.setDate(returnDate.getDate() + 14); // Assuming a 14-day rental period
      return returnDate < today ? today : returnDate; // Ensure return date is not in the past
    },
  },

  handoverDate: {
    type: Date,
    default: null, // This will be set when the book is handed over
  },

  // Adding payment status and total cost
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded',],
    default: 'pending'
  },

  
  totalCost: {
    type: Number,
    required: true,
    default: 0
  },
  latefee: {
    type: Number,
    default: 0 // This will be calculated based on the return date
  },


   status: {
    type: String,
    enum: ['active', 'completed', 'overdue', 'cancelled'],
    default: 'active'
  }
  
}, { timestamps: true });


// Middleware to calculate late fee before saving
// Pre-save hook to calculate late fee
rentSchema.pre('save', function (next) {
  if (this.returnDate && this.expectedReturnDate) {
    const lateDays = Math.ceil((this.returnDate - this.expectedReturnDate) / (1000 * 60 * 60 * 24));
    if (lateDays > 0) {
      const feePerDay = 10; // Example: ₹10 per day
      this.lateFee = lateDays * feePerDay;
    } else {
      this.lateFee = 0;
    }
  }
  next();
});

export const Rent = mongoose.model('Rent', rentSchema);
