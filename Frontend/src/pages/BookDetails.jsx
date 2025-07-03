import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Clean and validate the ID before making the request
    
    if (!id || id.length !== 24) {
      setError('Invalid book ID format');
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        
        if (!response.data?.success || !response.data.book) {
          throw new Error(response.data?.message || 'Invalid book data received');
        }
        
        setBook(response.data.book);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handleBorrow = () => {
  navigate('/userdetailsform'); // Replace with your actual route
};

  const handleBorrowClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to borrow this book.');
      navigate('/login', { state: { from: `/books/${id}` } });
      return;
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Book</Alert.Heading>
          <p>{error}</p>
          <Button variant="secondary" onClick={handleBack}>
            Back to Collection
          </Button>
        </Alert>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container py-5">
        <Alert variant="warning">
          <Alert.Heading>Book Not Found</Alert.Heading>
          <p>The requested book could not be found.</p>
          <Button variant="secondary" onClick={handleBack}>
            Back to Collection
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">Book Full Details</h3>

      <div className="row justify-content-center align-items-center">
        {/* Book Image */}
        <div className="col-md-5 mb-4 text-center">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          ) : (
            <div className="bg-light rounded-4 shadow d-flex align-items-center justify-content-center"
              style={{ height: '300px', width: '100%' }}>
              <span className="text-muted">No Cover Image</span>
            </div>
          )}
          <div className="d-flex gap-5 justify-content-center mt-4">
            <Button 
              variant="secondary" 
              className="px-4 rounded-pill"
              onClick={handleBack}
            >
              Back
            </Button>
           <Button 
  variant={book.isAvailable ? 'primary' : 'secondary'}
  className="px-4 rounded-pill"
  onClick={handleBorrow}
  disabled={!book.isAvailable}
>
  {book.isAvailable ? 'Borrow' : 'Not Available'}
</Button>
          </div>
        </div>

        {/* Book Info */}
        <div className="col-md-5">
          <h2 className="fw-bold mb-3">{book.title}</h2>
          <p className="lead">by {book.author}</p>
          <hr />
          
          <div className="mb-3">
            <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
            <p><strong>Language:</strong> {book.language || 'Tamil'}</p>
            <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Rent Price:</strong> Rs. {book.rentprice || '0'}</p>
            <p><strong>Rent Period:</strong> {book.rentPeriod || '14'} days</p>
            <p><strong>Late Fee:</strong> Rs. {book.lateFee || '0'}/day</p>
          </div>

          <div className="mt-3">
            <span className={`badge ${book.isAvailable ? 'bg-success' : 'bg-danger'}`}>
              {book.isAvailable ? 'Available' : 'Borrowed'}
            </span>
          </div>

          <div className="mt-4">
            <h5>Description</h5>
            <p>{book.description || 'No description available.'}</p>
          </div>
        </div>
      </div>

      {/* Borrow Book Modal */}
      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrow {book.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your UserDetailsForm component here */}
          <p>Borrow form would go here</p>
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