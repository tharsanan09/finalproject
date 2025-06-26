import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/feedback', form);
    setSubmitted(true);
    setForm({ name: '', message: '' });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Leave Your Feedback</h3>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
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
        <button type="submit" className="btn btn-purple w-100">Submit</button>
        {submitted && <div className="alert alert-success mt-3">Thank you for your feedback!</div>}
      </form>
    </div>
  );
};

export default FeedbackForm;
