import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminDashboard.css'; // Assuming you have a CSS file for styles

const PublishBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Book submitted:', book);
    // You can add your backend POST request here
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center vh-90">
      <div className="card shadow-sm p-4" style={{ width: '370px', background: '#f6f1f1', borderRadius: '15px' }}>
        <h4 className="text-center fw-bold mb-4" style={{ color: '#3b0a47' }}>Publish your book here</h4>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="text-center mb-3">
            <div
              className="bg-light rounded"
              style={{ width: '150px', height: '150px', margin: '0 auto' }}
            ></div>
            <label className="btn btn-light btn-sm mt-2">
              <strong>Upload</strong>
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </label>
          </div>

          {/* Title */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control bg-light fw-semibold"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author */}
          <div className="mb-3">
            <input
              type="text"
              name="author"
              className="form-control bg-light fw-semibold"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control bg-light fw-semibold"
              placeholder="Description"
              rows="3"
              value={book.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-purple w-100" style={{ color: 'white', fontWeight: 'bold', borderRadius: '20px' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishBook;
