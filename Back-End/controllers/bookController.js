import { Book } from '../models/Book.js';

// Admin - Create book
export const createBook = async (req, res) => {
  try {
    const { title, author, description, publishedDate, isAvailable } = req.body;

    // Use uploaded file path if exists
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const book = await Book.create({
      title,
      author,
      isbn: req.body.isbn || '', // Optional ISBN
      description,
      publishedDate,
      isAvailable,
      imageUrl
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Public - Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Public - Get single book
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
