import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [rents, setRents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchUserAndRents = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const userRes = await axios.get('http://localhost:5000/api/users/me', config);
        setUser(userRes.data);
        setFormData({ name: userRes.data.name, email: userRes.data.email, password: '' });

        const rentRes = await axios.get('http://localhost:5000/api/rents/mine', config);
        setRents(rentRes.data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };

    fetchUserAndRents();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const payload = { name: formData.name, email: formData.email };
      if (formData.password) payload.password = formData.password;

      const res = await axios.put('http://localhost:5000/api/users/me', payload, config);
      setUser(res.data);
      setFormData({ ...formData, password: '' }); // Clear password after update
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err.message);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '' }}>
      {/* User Info Card */}
      <div className="card w-50 shadow-sm p-4 mb-4">
        <h3 className="mb-4 text-center fw-bold">User Profile</h3>

        {isEditing ? (
          <>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">New Password (leave blank to keep current)</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success me-2" onClick={handleSave}>Save Changes</button>
            <button className="btn btn-secondary" onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button className="btn btn-purple w-50" onClick={handleEditToggle}>Edit Profile</button>
          </>
        )}
      </div>

      {/* Rent Details Card */}
      <div className="card shadow-sm p-4">
        <h4 className="mb-3 fw-bold">Your Rented Books</h4>
        {rents.length === 0 ? (
          <p>No books rented yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Book Title</th>
                  <th>Rent Date</th>
                  <th>Expected Return</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Late Fee</th>
                </tr>
              </thead>
              <tbody>
                {rents.map((rent) => (
                  <tr key={rent._id}>
                    <td>{rent.book?.title || 'N/A'}</td>
                    <td>{rent.rentDate ? new Date(rent.rentDate).toLocaleDateString() : '-'}</td>
                    <td>{rent.expectedReturnDate ? new Date(rent.expectedReturnDate).toLocaleDateString() : '-'}</td>
                    <td>{rent.returnDate ? new Date(rent.returnDate).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={`badge ${
                        rent.rentStatus === 'pending' ? 'bg-warning text-dark' :
                        rent.rentStatus === 'approved' ? 'bg-success' :
                        rent.rentStatus === 'returned' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {rent.rentStatus}
                      </span>
                    </td>
                    <td>{rent.lateFee ? `Rs. ${rent.lateFee}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
