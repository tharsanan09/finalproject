import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-center fw-bold mb-4">Welcome To Log in Page</h2>
      <div className="card p-4 shadow rounded-4 border-purple" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center fw-bold mb-4">Log in</h4>

        <div className="mb-3">
          <label className="form-label fw-semibold">User Name:</label>
          <input type="text" className="form-control rounded-pill bg-light" placeholder="Enter Your username here..." />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password:</label>
          <input type="password" className="form-control rounded-pill bg-light" placeholder="Enter Your password here..." />
        </div>

        <button className="btn btn-purple w-100 rounded-pill fw-semibold mb-3">Log in</button>

        <div className="divider d-flex align-items-center text-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 fw-bold">Or Log in with Google</span>
          <hr className="flex-grow-1" />
        </div>

        <button className="btn btn-outline-secondary w-100 rounded-pill mb-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google__G__Logo.svg" alt="Google" width="20" className="me-2" />
          Log in with Google
        </button>

        <p className="text-center fw-medium">
          Don’t have an account? <Link to="/register" className="text-primary fw-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
