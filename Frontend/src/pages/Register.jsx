

import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance'; {/*conect backend*/}


const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 mt-5 shadow"
        style={{width: '100%',maxWidth: '400px',border: '2px solid #9c27b0',borderRadius: '20px',
          backgroundColor: '#fff',}}>
        <h3 className="text-center mb-3 fw-bold">Sign up</h3>

        <form>
          {/* Full Name */}
          <div className="mb-2">
            <label className="fw-semibold mb-1">Full Name:</label>
            <input
              type="text"
              className="form-control rounded-pill px-3"
              placeholder="Enter your full name here..."
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="fw-semibold mb-1">Email Address:</label>
            <input
              type="email"
              className="form-control rounded-pill px-3"
              placeholder="Enter your email here..."
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="fw-semibold mb-1">Password:</label>
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Enter your password here..."
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <label className="fw-semibold mb-1">Confirm Password:</label>
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Re-enter your password here..."
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Role:</label>
            <select className="form-select rounded-pill px-3">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-purple w-50 rounded-pill fw-semibold" style={{ marginLeft: '25%' }}>
            Sign up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3 mb-0">
          You have an account? <Link to="/login" className="text-primary fw-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


