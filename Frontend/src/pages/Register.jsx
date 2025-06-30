import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // ✅ Your custom axios with baseURL
// import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      console.log("Registration successful:", res.data);
      navigate('/login'); // ✅ redirect to login after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 mt-5 shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          border: '2px solid #9c27b0',
          borderRadius: '20px',
          backgroundColor: '#fff',
        }}>
        <h3 className="text-center mb-3 fw-bold">Sign up</h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="fw-semibold mb-1">Full Name:</label>
            <input
              type="text"
              name="name"
              className="form-control rounded-pill px-3"
              placeholder="Enter your full name here..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="fw-semibold mb-1">Email Address:</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill px-3"
              placeholder="Enter your email here..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="fw-semibold mb-1">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill px-3"
              placeholder="Enter your password here..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="fw-semibold mb-1">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control rounded-pill px-3"
              placeholder="Re-enter your password here..."
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold mb-1">Role:</label>
            <select
              name="role"
              className="form-select rounded-pill px-3"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-purple w-50 rounded-pill fw-semibold" style={{ marginLeft: '25%' }}>
            Sign up
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          You have an account? <Link to="/login" className="text-primary fw-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
