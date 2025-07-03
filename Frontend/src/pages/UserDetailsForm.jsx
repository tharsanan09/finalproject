import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    icNumber: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">User Details</h2>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Full Name</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your Full name here..."
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Email Address</Form.Label>
            <Col sm="8">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email here..."
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Phone Number</Form.Label>
            <Col sm="8">
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number here..."
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
                rows={3}
                name="address"
                placeholder="Enter your address here..."
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">NIC Number</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="icNumber"
                placeholder="Enter your NIC number here..."
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
                  id="male"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  id="female"
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
            <Button type="submit" className="px-4 btn-purple ">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserDetailsForm;