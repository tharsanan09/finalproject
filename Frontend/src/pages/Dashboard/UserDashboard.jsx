import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [lateFees, setLateFees] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const userRes = await axios.get('http://localhost:5000/api/users/profile', config);
        setUser(userRes.data);

        const rentRes = await axios.get('http://localhost:5000/api/rents/my', config);
        setBorrowedBooks(rentRes.data.current);
        setLateFees(rentRes.data.lateFees);
        setHistory(rentRes.data.history);

        const wishRes = await axios.get('http://localhost:5000/api/wishlist', config);
        setWishlist(wishRes.data);

        const notifyRes = await axios.get('http://localhost:5000/api/notifications', config);
        setNotifications(notifyRes.data);

      } catch (err) {
        console.error('Error fetching dashboard data:', err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container-fluid mt-5 pt-3">
      <div className="row g-4">
        {/* Left Sidebar */}
        <div className="col-lg-3">
          {/* User Profile */}
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>User Profile</h5>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h6>Quick Actions</h6>
              <button className="btn btn-sm btn-primary w-100 mb-2">Borrow Book</button>
              <button className="btn btn-sm btn-success w-100">View Rents</button>
            </div>
          </div>

          {/* Notifications */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Notifications</h6>
              <ul className="list-unstyled">
                {notifications.map((n, i) => (
                  <li key={i}>📢 {n.message}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-6">
          {/* Currently Borrowed */}
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>Currently Borrowed Books</h5>
              {borrowedBooks.map(book => (
                <p key={book._id}>📘 {book.title} - Due: {new Date(book.returnDate).toLocaleDateString()}</p>
              ))}
            </div>
          </div>

          {/* Late Returns / Fines */}
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>Late Returns / Fines</h5>
              <p>{lateFees > 0 ? `Late Fee: Rs. ${lateFees}` : "No late fees. ✅"}</p>
            </div>
          </div>

          {/* Wishlist */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Wishlist</h5>
              <ul>
                {wishlist.map((book, i) => (
                  <li key={i}>📚 {book.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Borrowing History</h5>
              <ul>
                {history.map((item, i) => (
                  <li key={i}>✔️ {item.title}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> {history.length} books borrowed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
