import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">About Our Book Borrow App</h2>
      
      <p className="lead text-muted text-center mb-4">
        Welcome to our Book Borrowing Platform — your gateway to easy, flexible, and smart book sharing!
      </p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h5 className="fw-bold">Why We Built This App</h5>
          <p>
            We believe in the power of sharing knowledge. This app helps users borrow, lend, and manage books with just a few clicks. Whether you’re a reader or a book owner, our platform is designed to make borrowing easy and transparent.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h5 className="fw-bold">Key Features</h5>
          <ul>
            <li>📚 Browse and borrow available books</li>
            <li>📝 Add your own books to lend</li>
            <li>📅 Track borrow and return dates</li>
            <li>⚠️ Automatic late fee calculation</li>
            <li>🔐 Admin dashboard for managing users and books</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted">Happy Reading 📖 — Powered by Knowledge Sharing!</p>
      </div>
    </div>
  );
};

export default About;
