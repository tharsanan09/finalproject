import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/book logo.png';
import '../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';


function AdminNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav id="nav" className="navbar navbar-expand-lg fixed-top rounded-pill px-3 navbar-wrapper">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Book Buddy" height="80" className="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto gap-lg-4">
              <li className="nav-item">
                <Link className="nav-link" to="/"><b>Home</b></Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/books" >
                  <b>Books</b>
                </Link>
              </li>

            </ul>

            {/*  Auth buttons */}
            {!token ? (
              <Link to="/login" className="btn btn-dark btn-sm rounded-pill ms-lg-4 mt-3 mt-lg-0">
                <b>Log in</b>
              </Link>
            ) : (
              <div className="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
                {/*  User Initial */}
                 {/* Logout */}
                <button className="btn btn-dark btn-sm rounded-pill px-3" onClick={handleLogout}>
                  Logout
                </button>

                <button
  className="rounded-circle btn-dark  fw-bold text-center border-0"
  style={{
    width: '30px',
    height: '30px',
    lineHeight: '30px',
    fontSize: '18px',
    cursor: 'pointer',
  }}
  title={user?.name}
  onClick={() => navigate('/user')} // 👈 optional if you want to go to profile
>
  {user?.name?.charAt(0)?.toUpperCase()}
</button>

               
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
