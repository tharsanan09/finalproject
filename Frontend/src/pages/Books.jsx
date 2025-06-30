import React from 'react';
import '../styles/Books.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import book1 from '../assets/book1.jpeg';
import book2 from '../assets/book2.jpeg';
import book3 from '../assets/book3.jpeg';
import book4 from '../assets/book4.jpeg';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  // Sample book data - in a real app, this would come from an API
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: book1 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: book2 },
    { id: 3, title: "1984", author: "George Orwell", image: book3 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: book4 },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", image: book4 },
    { id: 6, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { id: 8, title: "Animal Farm", author: "George Orwell" },
    { id: 9, title: "Brave New World", author: "Aldous Huxley" }
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="sidebar shadow-sm p-3 rounded">
            <h5>Categories</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><a className="nav-link" href="#">English</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Comics</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Novels</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Stories</a></li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          <h4 className="text-center mt-3 mb-4 fw-bold">Explore Our Collection</h4>

          {/* Search */}
          <div className="search-bar mb-4">
            <input type="text" className="form-control search-input" placeholder="Search books..." />
          </div>

          {/* Book Grid - 3 rows x 3 columns */}
          <div className="row book2 row-cols-md-4 g-4">
            {books.map((book) => (
              <BookCard 
                key={book.id}
                id={book.id}
                title={book.title} 
                author={book.author}
                image={book.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// BookCard Component
const BookCard = ({ id, title, author, image }) => {
  const navigate = useNavigate();

  const handleView = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/books/${id}`); // Navigate to unique book detail page
    } else {
      alert("Please log in to view book details.");
      navigate("/login");
    }
  };

  return (
    <div className="col">
      <div className="card book-card h-100">
        {image && (
          <img 
            src={image} 
            className="card-img-top book-img" 
            alt={title} 
            style={{  objectFit: 'cover' }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ fontSize: '16px' }}>{title}</h5>
          <p className="card-text" style={{ fontSize: '12px' }}>Author: {author}</p>
          <button
            className="btn btn-purple w-100 mt-auto"
            style={{ fontSize: '12px' }}
            onClick={handleView}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;