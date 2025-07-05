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
    // Set by admin upon approval
  },
  expectedReturnDate: {
    type: Date,
    default:1,
    // Set by admin, typically 14 days from rentDate
  },
  returnDate: {
    type: Date,
    // Filled when the user returns the book
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  rentStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected','returned'],
    default: 'pending',
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
  lateFee: {
    type: Number,
    default: 50,
  },
  rentprice:{
    type:Number,
  },

  // user details
   fullName: String,
  email: String,
  phoneNumber: String,
  address: String,
  icNumber: String,
  gender: String
  
}, {
  timestamps: true,
});



// Admin - Update rent
export const updateRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: "Rent not found" });

    // Allow admin to update fields
    if (req.body.rentDate) rent.rentDate = new Date(req.body.rentDate);

    // Set expectedReturnDate (default +14 days from rentDate, or custom by admin)
    if (req.body.expectedReturnDate) {
      rent.expectedReturnDate = new Date(req.body.expectedReturnDate);
    } else if (rent.rentDate && !rent.expectedReturnDate) {
      rent.expectedReturnDate = new Date(rent.rentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    }

    // Set returnDate
    if (req.body.returnDate) {
      rent.returnDate = new Date(req.body.returnDate);

      // Calculate late fee
      const lateDays = Math.ceil((rent.returnDate - rent.expectedReturnDate) / (1000 * 60 * 60 * 24));
      rent.lateFee = lateDays > 0 ? lateDays * 50 : 0;
    }

    // Other fields
    if (req.body.status) rent.status = req.body.status;
    if (req.body.paymentStatus) rent.paymentStatus = req.body.paymentStatus;
    if (req.body.totalCost !== undefined) rent.totalCost = req.body.totalCost;

    await rent.save();

    res.json(rent);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



export const Rent = mongoose.model('Rent', rentSchema);

