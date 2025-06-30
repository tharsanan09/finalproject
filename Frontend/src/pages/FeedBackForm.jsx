import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);

  // 🔄 Auto-fill user name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // ✅ Get token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Set token in header
        },
      };

      await axios.post('http://localhost:5000/api/feedback', form, config);
      setSubmitted(true);
      setForm({ name: '', message: '', rating: 0 });
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Leave Your Feedback</h3>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
        
        {/* Name */}
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div className="mb-3">
          <textarea
            name="message"
            rows="4"
            placeholder="Your Feedback"
            className="form-control"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Star Rating */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Rating:</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                style={{
                  fontSize: '1.5rem',
                  color: star <= form.rating ? '#ffc107' : '#e4e5e9',
                  cursor: 'pointer',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-purple w-100">Submit</button>

        {submitted && (
          <div className="alert alert-success mt-3">
            Thank you for your feedback!
          </div>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
