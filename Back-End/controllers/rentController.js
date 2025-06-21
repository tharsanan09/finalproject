// import { Rent } from '../models/Rent.js';


// // connect book model
// // User - Rent a book
// export const createRent = async (req, res) => {
//   const rent = await Rent.create({
//     book: req.body.book,
//     user: req.user.id,
//     rentDate: new Date()
//   });
//   res.status(201).json(rent);
// };


// //  User - View own rents
// export const getMyRents = async (req, res) => {
//   const rents = await Rent.find({ user: req.user.id }).populate('book');
//   res.json(rents);
// };

// //  Admin - View all rents
// export const getAllRents = async (req, res) => {
//   try {
//     const rents = await Rent.find()
//       .populate({
//         path: 'book',
//         select: 'title author _id'
//       })
//       .populate({
//         path: 'user',
//         select: 'name _id'
//       });

//     res.json(rents);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch rents', error: err.message });
//   }
// };

// //  Admin - View single rent
// export const getRent = async (req, res) => {
//   try {
//     const rent = await Rent.findById(req.params.id)
//       .populate({
//         path: 'book',
//         select: 'title author _id'
//       })
//       .populate({
//         path: 'user',
//         select: 'name _id'
//       });

//     if (!rent) return res.status(404).json({ message: 'Rent not found' });

//     res.json(rent);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving rent', error: err.message });
//   }
// };


// //  Admin - Update rent (e.g., mark returned)
// export const updateRent = async (req, res) => {
//   const rent = await Rent.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!rent) return res.status(404).json({ message: "Rent not found" });
//   res.json(rent);
// };

// //  Admin - Delete rent
// export const deleteRent = async (req, res) => {
//   const rent = await Rent.findByIdAndDelete(req.params.id);
//   if (!rent) return res.status(404).json({ message: "Rent not found" });
//   res.json({ message: "Rent deleted" });
// };




// // rentController.js

// export const updateRentStatus = async (req, res) => {
//   const rent = await Rent.findById(req.params.id);

//   if (!rent) {
//     return res.status(404).json({ message: 'Rent not found' });
//   }

//   const today = new Date();

//   // Mark overdue if returnDate is past and status still active
//   if (rent.status === 'active' && rent.returnDate && rent.returnDate < today) {
//     rent.status = 'overdue';
//   }

//   // Example: if book is returned (by admin/user)
//   if (req.body.status === 'completed') {
//     rent.status = 'completed';
//     rent.returnDate = new Date();
//   }

//   // Allow admin to cancel
//   if (req.body.status === 'cancelled') {
//     rent.status = 'cancelled';
//   }

//   await rent.save();
//   res.json(rent);
// };

import { Rent } from '../models/Rent.js';
import { Book } from '../models/Book.js';
import { User } from '../models/User.js';

export const createRent = async (req, res) => {
  try {
    const { book: bookId } = req.body;

    // 1. Get book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is currently not available for rent' });
    }

    // 2. Optionally get user (you already have req.user.id)
    // const user = await User.findById(req.user.id);
        const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admins cannot rent books' });
    }

    // 3. Create rent entry
    const rent = await Rent.create({
      book: book._id,
      user: user._id,
      totalCost: book.bookprice || 0,
      paymentStatus: 'pending',
      rentStatus: 'pending',
      lateFee: 0
      // rentDate and expectedReturnDate to be set by admin later
    });

    res.status(201).json(rent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create rent request', error: err.message });
  }
};

export const getMyRents = async (req, res) => {
  try {
    const rents = await Rent.find({ user: req.user.id }).populate('book');
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your rents', error: err.message });
  }
};
export const getAllRents = async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate({ path: 'book', select: 'title author _id' })
      .populate({ path: 'user', select: 'name email _id' });

    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rents', error: err.message });
  }
};
export const getRentById = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id)
      .populate({ path: 'book', select: 'title author _id' })
      .populate({ path: 'user', select: 'name email _id' });

    if (!rent) return res.status(404).json({ message: 'Rent not found' });

    res.json(rent);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving rent', error: err.message });
  }
};
export const updateRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });

    const { rentStatus, returnDate, paymentStatus } = req.body;

    // Update fields if provided
    if (rentStatus) rent.rentStatus = rentStatus;
    if (returnDate) rent.returnDate = returnDate;
    if (paymentStatus) rent.paymentStatus = paymentStatus;

    // If returned, mark book as available again
    if (rentStatus === 'returned' || returnDate) {
      const book = await Book.findById(rent.book);
      if (book) {
        book.isAvailable = true;
        await book.save();
      }
    }

    await rent.save();
    res.json(rent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update rent', error: err.message });
  }
};
export const approveRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });

    if (rent.rentStatus === 'approved') {
      return res.status(400).json({ message: 'Rent already approved' });
    }

    const book = await Book.findById(rent.book);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.isAvailable) return res.status(400).json({ message: 'Book is not available' });

    const rentDate = new Date();
    const expectedReturnDate = new Date(rentDate);
    expectedReturnDate.setDate(rentDate.getDate() + book.rentPeriod);

    rent.rentDate = rentDate;
    rent.expectedReturnDate = expectedReturnDate;
    rent.rentStatus = 'approved';
    await rent.save();

    book.isAvailable = false;
    await book.save();

    res.json({ message: 'Rent approved successfully', rent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve rent', error: err.message });
  }
};

export const rejectRent = async (req, res) => {
  try {
    const rentId = req.params.id;

    const rent = await Rent.findById(rentId);
    if (!rent) {
      return res.status(404).json({ message: 'Rent request not found' });
    }

    if (rent.rentStatus === 'approved') {
      return res.status(400).json({ message: 'Cannot reject an already approved rent' });
    }

    rent.rentStatus = 'rejected';
    await rent.save();

    res.json({ message: 'Rent request rejected', rent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject rent', error: err.message });
  }
};

export const markAsReturned = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    if (rent.rentStatus !== 'approved') {
      return res.status(400).json({ message: 'Only approved rents can be marked as returned' });
    }

    const today = new Date();
    rent.returnDate = today;

    // Calculate late fee
    if (rent.expectedReturnDate && today > rent.expectedReturnDate) {
      const lateDays = Math.ceil((today - rent.expectedReturnDate) / (1000 * 60 * 60 * 24));
      const book = await Book.findById(rent.book);
      rent.lateFee = (book.lateFee || 0) * lateDays;
    } else {
      rent.lateFee = 0;
    }

    rent.rentStatus = 'returned';
    await rent.save();

    // Make book available again
    const book = await Book.findById(rent.book);
    if (book) {
      book.isAvailable = true;
      await book.save();
    }

    res.json({ message: 'Book marked as returned', rent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark as returned', error: err.message });
  }
};







