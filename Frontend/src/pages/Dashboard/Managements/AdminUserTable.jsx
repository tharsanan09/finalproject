import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
  const navigate = useNavigate(); //  for back navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const normalizedUsers = res.data.map(u => ({
          ...u,
          _id: u._id || u.id,
        }));

        setUsers(normalizedUsers);
      } catch (err) {
        alert("Error fetching users: " + (err.response?.data?.message || err.message));
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev =>
        prev.map(u => (u._id === editingUser._id ? { ...u, ...editForm } : u))
      );

      setShowModal(false);
    } catch (err) {
      alert("Error updating user: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert("Error deleting user: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      {/*  Back Button */}
      <button 
  className="btn text-white btn-outline-secondary" 
  onClick={() => navigate(-1)}
  style={{ backgroundColor: 'black' }}
>
  Back
</button>

      <h2 className="mb-4 text-center">User Management</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUserTable;
