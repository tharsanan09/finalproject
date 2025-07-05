import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const UserDetailsForm = ({ selectedBookId, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    icNumber: '',
    gender: ''
  });

  const [successMessage, setSuccessMessage] = useState('');  // <-- Add this

   const [book, setBook] = useState(null); 

  useEffect(() => {
  console.log('Received Book ID:', selectedBookId);

 const fetchBookDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/books/${selectedBookId}`);
    console.log("Fetched Book Response:", response.data);
    setBook(response.data); // NOT `response.data.book`
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
};

  if (selectedBookId) {
    fetchBookDetails();  // call function inside useEffect
  }

}, [selectedBookId]);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBookId) {
      alert('Book ID is missing!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = { ...formData, book: selectedBookId };
      console.log("Payload sent to backend:", payload);

      const response = await axios.post(
        'http://localhost:5000/api/rents',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      setSuccessMessage(' Your request has been sent to the admin! wait for replay...');
      setTimeout(() => {
        setSuccessMessage('');
        if (onClose) onClose(); // close modal after delay
      }, 5000);
    } catch (err) {
      console.error('Error submitting rent request:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to submit rent request');
    }
  };

  return (
    <div className="container mt-5 vh-100">
      <div className="card shadow p-5" style={{ maxWidth: '420px', margin: '0 auto', backgroundColor:'#4c4f54' }}>
        <h2 className="text-center mb-4">User Details</h2>

       {book && (
  <div className="mb-4 p-3 bg-dark text-white rounded">
    <strong>Rent price:</strong> {typeof book.rentprice === 'number' ? `Rs. ${book.rentprice}` : 'N/A'}
  </div>
)}
        {/* Success message */}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Full Name</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Email</Form.Label>
            <Col sm="8">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Phone</Form.Label>
            <Col sm="8">
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Address</Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">NIC</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="icNumber"
                value={formData.icNumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Gender</Form.Label>
            <Col sm="8">
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Form.Group>
          <div className="text-center mt-4">
            <Button type="submit" className="px-4 btn-purple">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
