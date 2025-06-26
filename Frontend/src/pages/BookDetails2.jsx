import React from 'react';
import { useNavigate } from 'react-router-dom';
import book6 from '../assets/book6.jpg'; // Replace with your actual image path

const BookDetails2 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">Book Full Details</h3>

      <div className="row justify-content-center align-items-center">
        {/* Book Image */}
        <div className="col-md-5 mb-4 text-center">
          <img
            src={book6}
            alt="Book"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>

        {/* Book Info */}
        <div className="col-md-5">
          <h5 className="fw-bold mb-2">Book Name</h5>
          <p className="fw-semibold">Author - Af. Abthul</p>

          <p className="text-muted mb-1">Books open the door to new ideas, knowledge, and imagination.</p>
          <p className="text-muted mb-1">Reading books helps us learn, grow, and see the world in new ways.</p>
          <p className="text-muted mb-4">Books open the door to new ideas, knowledge, and imagination.</p>

          <div className="d-flex gap-3">
            <button onClick={handleBack} className="btn btn-secondary px-4 rounded-pill">Back</button>
            <button className="btn btn-purple px-4 rounded-pill">Borrow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails2;
