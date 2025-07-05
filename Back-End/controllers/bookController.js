import mongoose from 'mongoose'; // ✅ Add this

import { Book } from '../models/Book.js';

// ✅ Admin - Create book
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      publishedDate,
      language,
      isbn,
      rentprice,
      rentPeriod,
      lateFee,
      isAvailable,
      imageUrl
    } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      publishedDate,
      language,
      isbn,
      rentprice,
      rentPeriod,
      lateFee,
      isAvailable,
      imageUrl //  This should be the Cloudinary image URL
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Public - Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().select('-__v');
    res.json({ 
      success: true,
      count: books.length,
      books 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching books',
      error: err.message 
    });
  }
};

//  Public - Get single book
export const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    console.log("Received ID:", bookId); //  Log incoming ID

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid book ID format"
      });
    }

    //  Log before DB call
    console.log("Looking for book in DB...");

    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ 
        success: false,
        message: "Book not found" 
      });
    }

    console.log("Book found:", book); //  Log raw book

    res.json({ 
      success: true,
      book 
    });
  } catch (err) {
    console.error(" Error in getBook:", err); //  Log full error
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching book",
      error: err.message 
    });
  }
};


//  Admin - Update book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Admin - Delete book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


