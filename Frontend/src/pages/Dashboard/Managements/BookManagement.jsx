import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const BookManagement = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedDate: '',
    rentprice: '',
    isAvailable: true,
    description: '',
    language: '',
    rentPeriod: '',
    lateFee: '',
    imageUrl: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      // Assuming res.data.books contains array of books
      setBooks(res.data.books);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // For number inputs, convert to number
    const val = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSaveBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editMode) {
        await axios.put(`http://localhost:5000/api/books/${editBookId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/books', formData, config);
      }

      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        publishedDate: '',
        rentprice: '',
        isAvailable: true,
        description: '',
        language: '',
        rentPeriod: '',
        lateFee: '',
        imageUrl: ''
      });
      setEditMode(false);
      setEditBookId(null);
      fetchBooks();
    } catch (err) {
      console.error('Error saving book:', err);
      alert('Failed to save book. Make sure you are logged in as an admin.');
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      category: book.category || '',
      publishedDate: book.publishedDate ? book.publishedDate.slice(0, 10) : '',
      rentprice: book.rentprice || '',
      isAvailable: book.isAvailable,
      description: book.description || '',
      language: book.language || '',
      rentPeriod: book.rentPeriod || '',
      lateFee: book.lateFee || '',
      imageUrl: book.imageUrl || ''
    });
    setEditBookId(book.Book_id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        await axios.delete(`http://localhost:5000/api/books/${id}`, config);
        fetchBooks();
      } catch (err) {
        console.error('Error deleting book:', err);
        alert('Failed to delete book. Make sure you are logged in as admin.');
      }
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container mt-5 text-center">Loading books...</div>;
  }

  return (
    <div className="container mt-5">
      <button
        className="btn text-white btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
        style={{ backgroundColor: 'black' }}
      >
        Back
      </button>
      <h3 className="mb-4 text-center fw-bold">Book Management</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control rounded-pill px-4"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Book Form */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Book name"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Publication year"
            name="publishedDate"
            type="date"
            value={formData.publishedDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Rental price"
            name="rentprice"
            type="number"
            value={formData.rentprice}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          <textarea
            className="form-control bg-light fw-semibold"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Rent Period (days)"
            name="rentPeriod"
            type="number"
            value={formData.rentPeriod}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Late Fee"
            name="lateFee"
            type="number"
            value={formData.lateFee}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control bg-light fw-semibold"
            placeholder="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          className="btn btn-primary rounded-pill px-4"
          style={{ backgroundColor: '#551A8B', border: 'none' }}
          onClick={handleSaveBook}
        >
          {editMode ? 'Update Book' : 'Add Book'}
        </button>

        {editMode && (
          <button
            className="btn btn-secondary ms-3 rounded-pill px-4"
            onClick={() => {
              setEditMode(false);
              setEditBookId(null);
              setFormData({
                title: '',
                author: '',
                isbn: '',
                category: '',
                publishedDate: '',
                rentprice: '',
                isAvailable: true,
                description: '',
                language: '',
                rentPeriod: '',
                lateFee: '',
                imageUrl: ''
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <h5 className="mb-3 fw-bold">Book inventory</h5>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Year</th>
              <th>Rent Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="8">No books found</td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.Book_id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category || '-'}</td>
                  <td>{book.publishedDate ? new Date(book.publishedDate).getFullYear() : '-'}</td>
                  <td>Rs. {book.rentprice}</td>
                  <td>{book.isAvailable ? 'Available' : 'Borrowed'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => navigate(`/books/${book.Book_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning text-white me-1"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(book.Book_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
