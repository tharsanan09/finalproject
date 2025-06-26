import React from "react";
import { FaBook, FaHistory, FaStar } from "react-icons/fa";
import "../../styles/UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="container3 ">
      <h4 className="fw-bold mb-4 ">Welcome to Your Dashboard</h4>

      <div className="row g-4">
        {/* Borrowed Books */}
        <div className="col-md-4">
          <div className="dashboard-card shadow-sm p-4 rounded text-center border">
            <FaBook size={40} className="mb-2 text-purple" />
            <h5>Books Borrowed</h5>
            <p className="fw-bold fs-4">3</p>
          </div>
        </div>

        {/* Borrow History */}
        <div className="col-md-4">
          <div className="dashboard-card shadow-sm p-4 rounded text-center border">
            <FaHistory size={40} className="mb-2 text-purple" />
            <h5>Borrow History</h5>
            <p className="fw-bold fs-4">8</p>
          </div>
        </div>

        {/* Reviews Given */}
        <div className="col-md-4">
          <div className="dashboard-card shadow-sm p-4 rounded text-center border">
            <FaStar size={40} className="mb-2 text-purple" />
            <h5>Your Reviews</h5>
            <p className="fw-bold fs-4">5</p>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-purple rounded-pill px-4">View Borrowed Books</button>
      </div>
    </div>
  );
};

export default UserDashboard;
