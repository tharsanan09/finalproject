import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFeedback, setEditingFeedback] = useState(null);

  const [formData, setFormData] = useState({
    message: '',
    rating: 3,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

 const fetchFeedbacks = async () => {
  try {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    const res = await axios.get('http://localhost:5000/api/feedbacks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setFeedbacks(res.data);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`http://localhost:5000/api/feedbacks/${id}`);
        fetchFeedbacks();
      } catch (err) {
        console.error('Error deleting feedback:', err);
      }
    }
  };

  const handleEditClick = (feedback) => {
    setEditingFeedback(feedback);
    setFormData({ message: feedback.message, rating: feedback.rating });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/feedbacks/${editingFeedback._id}`, formData);
      setEditingFeedback(null);
      fetchFeedbacks();
    } catch (err) {
      console.error('Error updating feedback:', err);
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) =>
    fb.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center fw-bold">Admin Feedback Management</h3>

      <input
        type="text"
        className="form-control rounded-pill px-4 mb-3"
        placeholder="Search by name or message..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>User Name</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((fb) => (
              <tr key={fb._id}>
                <td>{fb.name || 'N/A'}</td>
                <td>{fb.message}</td>
                <td>{fb.rating}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm text-white me-2"
                    onClick={() => handleEditClick(fb)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(fb._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredFeedbacks.length === 0 && (
              <tr>
                <td colSpan="4">No feedbacks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingFeedback && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Feedback</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingFeedback(null)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingFeedback(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
