// import React from 'react';
// import '../styles/Books.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import book1 from '../assets/book1.jpeg';
// import book2 from '../assets/book2.jpeg';
// import book3 from '../assets/book3.jpeg';
// import book4 from '../assets/book4.jpeg';
// import { useNavigate } from 'react-router-dom';

// const Books = () => {
//   // Sample book data - in a real app, this would come from an API
//   const books = [
//     { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: book1 },
//     { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: book2 },
//     { id: 3, title: "1984", author: "George Orwell", image: book3 },
//     { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: book4 },
//     { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", image: book4 },
//     { id: 6, title: "Harry Potter", author: "J.K. Rowling" },
//     { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger" },
//     { id: 8, title: "Animal Farm", author: "George Orwell" },
//     { id: 9, title: "Brave New World", author: "Aldous Huxley" }
//   ];

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3">
//           <div className="sidebar shadow-sm p-3 rounded">
//             <h5>Categories</h5>
//             <ul className="nav flex-column">
//               <li className="nav-item"><a className="nav-link" href="#">English</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">Comics</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">Novels</a></li>
//               <li className="nav-item"><a className="nav-link" href="#">Stories</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="col-md-9">
//           <h4 className="text-center mt-3 mb-4 fw-bold">Explore Our Collection</h4>

//           {/* Search */}
//           <div className="search-bar mb-4">
//             <input type="text" className="form-control search-input" placeholder="Search books..." />
//           </div>

//           {/* Book Grid - 3 rows x 3 columns */}
//           <div className="row book2 row-cols-md-4 g-4">
//             {books.map((book) => (
//               <BookCard 
//                 key={book.id}
//                 id={book.id}
//                 title={book.title} 
//                 author={book.author}
//                 image={book.image}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // BookCard Component
// const BookCard = ({ id, title, author, image }) => {
//   const navigate = useNavigate();

//   const handleView = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate(`/books/${id}`); // Navigate to unique book detail page
//     } else {
//       alert("Please log in to view book details.");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="col">
//       <div className="card book-card h-100">
//         {image && (
//           <img 
//             src={image} 
//             className="card-img-top book-img" 
//             alt={title} 
//             style={{  objectFit: 'cover' }}
//           />
//         )}
//         <div className="card-body d-flex flex-column">
//           <h5 className="card-title" style={{ fontSize: '16px' }}>{title}</h5>
//           <p className="card-text" style={{ fontSize: '12px' }}>Author: {author}</p>
//           <button
//             className="btn btn-purple w-100 mt-auto"
//             style={{ fontSize: '12px' }}
//             onClick={handleView}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Books;

import React, { useState, useEffect } from 'react';
import '../styles/Books.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Fetch books from backend API
  useEffect(function() {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        
        // Handle response structure
        const booksData = response.data?.books || [];
        
        // Ensure books is always an array
        if (!Array.isArray(booksData)) {
          throw new Error('Invalid books data format');
        }
        
        setBooks(booksData);
        
        // Extract unique categories safely
        const uniqueCategories = ['All'];
        booksData.forEach(function(book) {
          if (book.category && !uniqueCategories.includes(book.category)) {
            uniqueCategories.push(book.category);
          }
        });
        
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setBooks([]);
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  function handleCategorySelect(category) {
    setSelectedCategory(category === 'All' ? '' : category);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // Safe filtering with null checks
  const filteredBooks = books.filter(function(book) {
    try {
      const title = book.title?.toLowerCase() || '';
      const author = book.author?.toLowerCase() || '';
      const bookCategory = book.category || '';
      
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                          author.includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || bookCategory === selectedCategory;
      
      return matchesSearch && matchesCategory;
    } catch (filterErr) {
      console.error('Error filtering book:', book, filterErr);
      return false;
    }
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Books</Alert.Heading>
          <p>{error}</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="sidebar shadow-sm p-3 rounded">
            <h5>Categories</h5>
            <ul className="nav flex-column">
              {categories.map(function(category, index) {
                const isActive = selectedCategory === (category === 'All' ? '' : category);
                return (
                  <li key={index} className="nav-item">
                    <button 
                      className={`nav-link text-start ${isActive ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(category)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          <h4 className="text-center mt-3 mb-4 fw-bold">Explore Our Collection</h4>

          {/* Search */}
          <div className="search-bar mb-4">
            <input 
              type="text" 
              className="form-control search-input" 
              placeholder="Search books..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Book Grid */}
          {filteredBooks.length === 0 ? (
            <Alert variant="info">
              No books found matching your criteria
              {selectedCategory && ` in category "${selectedCategory}"`}
              {searchTerm && ` with search term "${searchTerm}"`}
            </Alert>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredBooks.map(function(book) {
                return (
                  <BookCard 
                   key={book.Book_id}
                    id={book.Book_id}
                    title={book.title} 
                    author={book.author}
                    image={book.imageUrl}
                    category={book.category}
                    available={book.isAvailable}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// BookCard Component
function BookCard({ id, title, author, image, category, available }) {
  const navigate = useNavigate();

 function handleView() {
  if (!id) {
    alert("Invalid book ID.");
    return;
  }
  const token = localStorage.getItem("token");
  if (token) {
    navigate(`/books/${id}`);
  } else {
    alert("Please log in to view book details.");
    navigate("/login", { state: { from: `/books/${id}` } });
  }
}


  return (
    <div className="col">
      <div className="card book-card h-80 shadow-sm ">
        {image ? (
          <img 
            src={image} 
            className="card-img-top book-img" 
            alt={title} 
            style={{ 
              height: '150px', 
              objectFit: 'cover',
              borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}
          />
        ) : (
          <div className="book-img-placeholder d-flex align-items-center justify-content-center bg-light"
            style={{ height: '200px' }}>
            <span className="text-muted">No Image Available</span>
          </div>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">by {author}</p>
          {category && (
            <span className="badge bg-secondary mb-2 align-self-start">
              {category}
            </span>
          )}
          <p className="card-text">
            Status: 
            <span className={`ms-2 badge ${available ? 'bg-success' : 'bg-danger'}`}>
              {available ? 'Available' : 'Borrowed'}
            </span>
          </p>
          <button
            className="btn btn-purple w-100 mt-auto"
            onClick={handleView}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Books;