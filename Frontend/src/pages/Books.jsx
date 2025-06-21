import React from 'react';
import '../styles/Books.css';
import book1 from '../assets/book1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import book2 from '../assets/book2.jpeg';
import book3 from '../assets/book3.jpeg';
import book4 from '../assets/book4.jpeg';



const Books = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="sidebar  shadow-sm p-3 rounded">
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
          <h3 className="text-center mt-3 mb-4 fw-bold">Explore Our Collection</h3>

          {/* Search */}
          <div className="search-bar mb-4">
            <input type="text" className="form-control search-input" placeholder="Search books..." />
          </div>

          {/* Book Grid - 3 rows x 3 columns */}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <BookCard title="Book Title 1" price="100" image={book1} />
            <BookCard title="Book Title 2" price="299" image={book2} />
            <BookCard title="Book Title 3" price="399" image={book3} />
            <BookCard title="Book Title 4" price="499" image={book4} />
            <BookCard title="Book Title 5" price="599" />
            <BookCard title="Book Title 6" price="699" />
            <BookCard title="Book Title 7" price="799" />
            <BookCard title="Book Title 8" price="899" />
            <BookCard title="Book Title 9" price="999" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ BookCard Component
const BookCard = ({ title, price, image }) => {
  return (
    <div className="col">
      <div className="card book-card h-100">
        <img src={image} className="card-img-top book-img" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Author: Sample Author</p>
          <p className="card-text text-primary fw-semibold">Rs. {price}.00</p>
          <button className="btn btn-outline-primary w-100">More Details</button>
        </div>
      </div>
    </div>



  );
};

export default Books;
