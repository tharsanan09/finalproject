import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import book7 from '../assets/book7.jpg';
import UserDetailsForm from './UserDetailsForm'; // Import your form component

const BookDetails = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleBorrowClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">Book Full Details</h3>

      <div className="row justify-content-center align-items-center">
        {/* Book Image */}
        <div className="col-md-5 mb-4 text-center">
          <img
            src={book7}
            alt="Book"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>

        {/* Book Info */}
        <div className="col-md-5">
          <h5 className="fw-bold mb-2">Book Name</h5>
          <p className="fw-semibold">Author - Af. Abthul</p>
          <p className="fw-semibold text-success">Rent Price: ₹50</p> {/* ✅ Added line */}


          <p className="text-muted mb-1">Books open the door to new ideas, knowledge, and imagination.</p>
          <p className="text-muted mb-1">Reading books helps us learn, grow, and see the world in new ways.</p>
          <p className="text-muted mb-4">Books open the door to new ideas, knowledge, and imagination.</p>
          
          <div className="d-flex gap-3">
            <button onClick={handleBack} className="btn btn-secondary px-4 rounded-pill">Back</button>
            <button 
              onClick={handleBorrowClick}
              className="btn btn-purple px-4 rounded-pill"
            >
              Borrow
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrow Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserDetailsForm 
            onSuccess={() => {
              handleCloseForm();
              // Optional: Add any success action here
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetails;