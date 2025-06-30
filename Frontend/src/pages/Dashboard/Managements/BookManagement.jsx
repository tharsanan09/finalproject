import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookManagement = () => {
  const books = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      category: 'Fiction',
      year: 1960,
      price: '$5.99',
      status: 'Available',
    },
    {
      id: 3,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      category: 'Science',
      year: 1988,
      price: '$6.99',
      status: 'Available',
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      category: 'Fiction',
      year: 1925,
      price: '$4.50',
      status: 'Available',
    },
    {
      id: 5,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      category: 'Technology',
      year: 2008,
      price: '$8.99',
      status: 'Available',
    },
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">Book Management</h3>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control rounded-pill px-4"
          placeholder="Search books..."
        />
      </div>

      {/* Book Form */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input className="form-control bg-light fw-semibold" placeholder="Book name" />
        </div>
        <div className="col-md-6">
          <input className="form-control bg-light fw-semibold" placeholder="Author" />
        </div>
        <div className="col-md-6">
          <input className="form-control bg-light fw-semibold" placeholder="ISBN" />
        </div>
        <div className="col-md-6">
          <input className="form-control bg-light fw-semibold" placeholder="Publication year" />
        </div>
        <div className="col-md-6">
          <select className="form-select bg-light fw-semibold">
            <option>Select Category</option>
            <option>Fiction</option>
            <option>Science</option>
            <option>Technology</option>
          </select>
        </div>
        <div className="col-md-6">
          <input className="form-control bg-light fw-semibold" placeholder="Rental price" />
        </div>
      </div>

      {/* Add Book Button */}
      <button className="btn btn-primary rounded-pill px-4 mb-4" style={{ backgroundColor: '#551A8B', border: 'none' }}>
        Add book
      </button>

      {/* Book Inventory Table */}
      <h5 className="mb-3 fw-bold">Book inventory</h5>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.year}</td>
                <td>{book.price}</td>
                <td>{book.status}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-1">View</button>
                  <button className="btn btn-sm btn-warning text-white me-1">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
