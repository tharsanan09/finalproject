import { Rent } from '../models/Rent.js';
import { Book } from '../models/Book.js';
import { User } from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import mongoose from 'mongoose';

// 🟢 User - Rent a book (quick dashboard version)
export const createRent = async (req, res) => {
  try {
    console.log("💡 Request Body:", req.body);
    console.log("📦 Book ID in body:", req.body.book);

    const { book } = req.body;
    const bookData = await Book.findById(book);
    if (!bookData) return res.status(404).json({ message: 'Book not found' });
    if (!bookData.isAvailable) return res.status(400).json({ message: 'Book is not available' });

    const user = req.user;
    if (!user || user.role === 'admin') return res.status(403).json({ message: 'Only users can rent books' });

    const rent = await Rent.create({
      book: bookData._id,
      user: user._id,
      totalCost: bookData.rentprice || 0,
      paymentStatus: 'pending',
      rentStatus: 'pending',
      lateFee: 0
    });

    res.status(201).json(rent);
  } catch (err) {
    console.error("❌ Rent Create Error:", err.message);
    res.status(500).json({ message: 'Failed to create rent request', error: err.message });
  }
};


export const createRentRequest = async (req, res) => {
  try {
    const userId = req.user._id; // assuming auth middleware sets req.user
    const {
      bookId,
      fullName,
      email,
      phoneNumber,
      address,
      icNumber,
      gender
    } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Check book availability
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is not available for rent' });
    }

    // Create new Rent document
    const rent = new Rent({
      book: book._id,
      user: userId,
      rentStatus: 'pending',
      paymentStatus: 'pending',
      totalCost: 0,  // admin will set later
      lateFee: 0,
      rentprice: book.rentprice || 0,
      fullName,
      email,
      phoneNumber,
      address,
      icNumber,
      gender
    });

    await rent.save();

        await sendEmail(
      'tharshanantharsan@gmail.com', // 🔁 Replace with real admin email
      '📚 New Rent Request Received',
      `User ${fullName} (${email}) has submitted a rent request for the book "${book.title}".\n\nPhone: ${phoneNumber}\nNIC: ${icNumber}\nAddress: ${address}`
    );


    // Optionally, mark book as not available (or wait for admin approval)
    // book.isAvailable = false;
    // await book.save();

    res.status(201).json({ success: true, rent, message: 'Rent request created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// 🟢 User - Get own rents
export const getMyRents = async (req, res) => {
  try {
    const rents = await Rent.find({ user: req.user.id }).populate('book');
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your rents', error: err.message });
  }
};

// 🟢 Admin - Get all rents
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

// 🟢 Admin - Get rent by ID
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

// 🟢 Admin - Update rent
export const updateRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });

    const { rentStatus, returnDate, paymentStatus } = req.body;

    if (rentStatus) rent.rentStatus = rentStatus;
    if (returnDate) rent.returnDate = returnDate;
    if (paymentStatus) rent.paymentStatus = paymentStatus;
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

// 🟢 Admin - Approve rent
export const approveRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id)
      .populate('user')
      .populate('book');

    if (!rent) return res.status(404).json({ message: 'Rent not found' });
    if (rent.rentStatus === 'approved') return res.status(400).json({ message: 'Already approved' });

    const book = rent.book;
    if (!book || !book.isAvailable) return res.status(400).json({ message: 'Book is not available' });

    const rentDate = new Date();
    const expectedReturnDate = new Date(rentDate);
    expectedReturnDate.setDate(rentDate.getDate() + (book.rentPeriod || 14));

    rent.rentDate = rentDate;
    rent.expectedReturnDate = expectedReturnDate;
    rent.rentStatus = 'approved';

    await rent.save();

    // ✅ Send Email after populating
    await sendEmail(
      rent.email || rent.user.email, // fallback if user didn't fill email in form
      '✅ Your Book Rent Request is Approved',
      `Hi ${rent.fullName || rent.user.name},\n\nYour request to borrow the book "${book.title}" has been approved.\n\n📅 Rent Date: ${rentDate.toDateString()}\n📅 Expected Return: ${expectedReturnDate.toDateString()}\n\nThank you for using our platform!`
    );

    book.isAvailable = false;
    await book.save();

    res.json({ message: 'Rent approved successfully', rent });
  } catch (err) {
    console.error('❌ Approve Rent Error:', err);
    res.status(500).json({ message: 'Failed to approve rent', error: err.message });
  }
};


// 🟢 Admin - Reject rent
export const rejectRent = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });
    if (rent.rentStatus === 'approved') return res.status(400).json({ message: 'Cannot reject approved rent' });

    rent.rentStatus = 'rejected';
    await rent.save();

    res.json({ message: 'Rent rejected', rent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject rent', error: err.message });
  }
};

// 🟢 Admin - Mark as returned and calculate late fee
export const markAsReturned = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });
    if (rent.rentStatus !== 'approved') return res.status(400).json({ message: 'Only approved rents can be returned' });

    const today = new Date();
    rent.returnDate = today;

    if (rent.expectedReturnDate && today > rent.expectedReturnDate) {
      const lateDays = Math.ceil((today - rent.expectedReturnDate) / (1000 * 60 * 60 * 24));
      const book = await Book.findById(rent.book);
      rent.lateFee = (book.lateFee || 0) * lateDays;
    } else {
      rent.lateFee = 0;
    }

    rent.rentStatus = 'returned';
    await rent.save();

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




