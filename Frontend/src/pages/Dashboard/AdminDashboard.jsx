import React from 'react';
import "../../styles/AdminDashboard.css";
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaTruck, FaExclamationCircle } from 'react-icons/fa';
  import AdminUserTable from './Managements/AdminUserTable';
  import BookManagement from './Managements/BookManagement';
  import AdminFeedback from './Managements/AdminFeedback';
  import AdminRentManagement from './Managements/AdminRentManagement';

const AdminDashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  return (
    <div className="container" style={{backgroundcolor: '#532a09'}}>
      {/* Top Tabs */}
      <div className="d-flex gap-3 mt-5 mb-4">
        <button
          onClick={() => navigate('/admin/users')}
          className="btn mt-3 btn-purple px-3 rounded-pill"
        >
          User Management
        </button>
        <button onClick={() => navigate('/admin/bookmanagement')} className="btn mt-3 btn-purple px-3 rounded-pill">Book Management</button>


        <button onClick={() => navigate('/admin/adminrentmanagement')} className="btn mt-3 btn-purple px-3 rounded-pill">Rent Management</button>
        <button className="btn mt-3 btn-purple px-3 rounded-pill">Payment Management</button>
         <button onClick={() => navigate('/admin/feedbacks')} className="btn mt-3 btn-purple px-3 rounded-pill">Feedback Management</button>
      </div>

      {/* Dashboard Header */}
      <h4 className="fw-bold text-white btn-purple d-inline-block px-3 py-2 rounded mb-5">
        Admin Dashboard
      </h4>

      {/* Statistics Cards */}
      <div className="row g-4">
        <div className="col-md-4 w-25">
          <div className="dashboard-card shadow-sm p-3 text-center" >
            <FaBook size={30} className="mb-2" />
            <h6 className="fw-bold">Total Books</h6>
            <p className="text-purple fs-4">24</p>
          </div>
        </div>

        <div className="col-md-4 w-25">
          <div className="dashboard-card shadow-sm p-3 text-center">
            <FaUser size={30} className="mb-2" />
            <h6 className="fw-bold">Total Users</h6>
            <p className="text-purple fs-4">12</p>
          </div>
        </div>

        <div className="col-md-4 w-25">
          <div className="dashboard-card shadow-sm p-3 text-center">
            <FaTruck size={30} className="mb-2" />
            <h6 className="fw-bold">Books Borrowed</h6>
            <p className="text-purple fs-4">6</p>
          </div>
        </div>

        <div className="col-md-4 w-25">
          <div className="dashboard-card shadow-sm p-3 text-center">
            <FaExclamationCircle size={30} className="mb-2 text-danger" />
            <h6 className="fw-bold">Overdue Returns</h6>
            <p className="text-danger fs-4">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
