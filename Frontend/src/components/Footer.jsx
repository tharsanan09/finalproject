import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer text-light pt-4 pb-0 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Book Buddy</h5>
            <p  id="you"className="small text-light text-muted " >
              Your favorite place to explore, borrow, and enjoy books of every genre. Discover your next read with us!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/books" className="text-light text-decoration-none">Books</a></li>
              <li><a href="/rent" className="text-light text-decoration-none">Rent</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="small mb-1"><i className="bi bi-geo-alt-fill me-2"></i>Kopay North, Jaffna</p>
            <p className="small mb-1"><i className="bi bi-envelope-fill me-2"></i>tharsanan2000@gmail.com</p>
            <p className="small"><i className="bi bi-telephone-fill me-2"></i>+94 766 918 266</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} Book Buddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
