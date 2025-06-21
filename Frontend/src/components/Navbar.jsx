import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/book logo.png';
import '../styles/Home.css';


import { Link } from 'react-router-dom';



function Navbar() {

    return (

        <>
          <nav id='nav' className="navbar navbar-expand-lg navbar-dark bg-purple fixed-top rounded-pill px-3 navbar-wrapper">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Book Buddy" height="80"   className="me-2 " />
      </Link>


      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-lg-3">
          <li className="nav-item"><Link className="nav-link" to="/"><b>Home</b></Link></li>
          <li className="nav-item"><Link className="nav-link" to="/service"><b>Service</b></Link></li>
          <li className="nav-item"><Link className="nav-link" to="/books"><b>Books</b></Link></li>
          <li className="nav-item"><Link className="nav-link" to="/publish"><b>Publish</b></Link></li>
          <li className="nav-item"><Link className="nav-link" to="/rent"><b>Rent</b></Link></li>
        </ul>

        <Link to="/login" className="btn btn-dark  ms-lg-4 mt-3 mt-lg-0">
          <b>Log in</b> 
        </Link>
      </div>
    </div>
  </nav>
        </>

    )

}

export default Navbar;


