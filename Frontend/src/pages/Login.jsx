import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // your axios setup
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', formData);
      console.log("Login success", res.data);

      // Store token if needed
      localStorage.setItem("token", res.data.token);

    // Save user data (optional but useful)
    localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to dashboard
      if (res.data.user.role === "admin") {
        navigate('/admin');
      } else {
        navigate('/bookdetails');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h3 className="text-center fw-bold mb-2">Welcome To Log in Page</h3>
      <div className="card p-4 shadow rounded-4 border-purple" style={{ maxWidth: '330px', width: '100%' }}>
        <h4 className="text-center fw-bold mb-3">Log in</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fw-semibold">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill bg-light"
              placeholder="Enter Your email here..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill bg-light"
              placeholder="Enter Your password here..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-purple w-50 rounded-pill fw-semibold mb-2" style={{ marginLeft: '25%' }}>
            Log in
          </button>
        </form>

        <div className="divider d-flex align-items-center text-center my-2">
          <hr className="flex-grow-1" />
          <span className="mx-2 fw-bold">Or Log in with Google</span>
          <hr className="flex-grow-1" />
        </div>

        <button className="btn btn-outline-secondary w-100 rounded-pill mb-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google__G__Logo.svg"
            alt="Google"
            width="20"
            className="me-2"
          />
          Log in with Google
        </button>

        <p className="text-center fw-medium">
          Don’t have an account?{' '}
          <Link to="/register" className="text-primary fw-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
