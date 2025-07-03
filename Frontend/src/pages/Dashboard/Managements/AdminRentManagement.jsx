// // src/components/AdminRentManagement.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AdminRentManagement = () => {
//   const [rents, setRents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRents();
//   }, []);

// const fetchRents = async () => {
//   try {
//     const res = await axios.get('http://localhost:5000/api/rents', {
//       withCredentials: true // sends cookies for authentication
//     });
//     setRents(res.data);
//   } catch (err) {
//     console.error('Error fetching rents:', err);
//     setError('Failed to load rent records');
//   } finally {
//     setLoading(false);
//   }
// };

//   const approveRent = async (id) => {
//     if (window.confirm('Approve this rent request?')) {
//       try {
//         await axios.put(`http://localhost:5000/api/rents/approve/${id}`, {}, { withCredentials: true });
//         fetchRents();
//       } catch (err) {
//         alert('Approval failed: ' + (err.response?.data?.message || err.message));
//       }
//     }
//   };

//   const rejectRent = async (id) => {
//     if (window.confirm('Reject this rent request?')) {
//       try {
//         await axios.put(`http://localhost:5000/api/rents/reject/${id}`, {}, { withCredentials: true });
//         fetchRents();
//       } catch (err) {
//         alert('Rejection failed: ' + (err.response?.data?.message || err.message));
//       }
//     }
//   };

//   const returnRent = async (id) => {
//     if (window.confirm('Mark this rent as returned?')) {
//       try {
//         await axios.put(`http://localhost:5000/api/rents/return/${id}`, {}, { withCredentials: true });
//         fetchRents();
//       } catch (err) {
//         alert('Return failed: ' + (err.response?.data?.message || err.message));
//       }
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4 text-center fw-bold">Admin Rent Management</h3>
//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : rents.length === 0 ? (
//         <div className="text-center">No rent records found.</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered text-center align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>User</th>
//                 <th>Book</th>
//                 <th>Rent Date</th>
//                 <th>Expected Return</th>
//                 <th>Return Date</th>
//                 <th>Status</th>
//                 <th>Payment</th>
//                 <th>Late Fee</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rents.map((rent) => (
//                 <tr key={rent._id}>
//                   <td>{rent.user?.name || 'N/A'}</td>
//                   <td>{rent.book?.title || 'N/A'}</td>
//                   <td>{rent.rentDate ? new Date(rent.rentDate).toLocaleDateString() : '-'}</td>
//                   <td>{rent.expectedReturnDate ? new Date(rent.expectedReturnDate).toLocaleDateString() : '-'}</td>
//                   <td>{rent.returnDate ? new Date(rent.returnDate).toLocaleDateString() : '-'}</td>
//                   <td>
//                     <span className={`badge ${rent.rentStatus === 'pending' ? 'bg-warning text-dark' : rent.rentStatus === 'approved' ? 'bg-success' : 'bg-secondary'}`}>
//                       {rent.rentStatus}
//                     </span>
//                   </td>
//                   <td>{rent.paymentStatus}</td>
//                   <td>{rent.lateFee ? `Rs. ${rent.lateFee}` : '-'}</td>
//                   <td>
//                     {rent.rentStatus === 'pending' && (
//                       <>
//                         <button className="btn btn-sm btn-success me-1" onClick={() => approveRent(rent._id)}>Approve</button>
//                         <button className="btn btn-sm btn-danger" onClick={() => rejectRent(rent._id)}>Reject</button>
//                       </>
//                     )}
//                     {rent.rentStatus === 'approved' && (
//                       <button className="btn btn-sm btn-primary" onClick={() => returnRent(rent._id)}>Mark Returned</button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminRentManagement;


import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure this is properly configured
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminRentManagement = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      await axios.get('http://localhost:5000/api/rents', { withCredentials: true });
      setRents(res.data);
    } catch (err) {
      console.error('Error fetching rents:', err);
      setError('Failed to load rent records');
    } finally {
      setLoading(false);
    }
  };

  const approveRent = async (id) => {
    if (window.confirm('Approve this rent request?')) {
      try {
await axios.put(`http://localhost:5000/api/rents/approve/${id}`, {}, { withCredentials: true });        fetchRents();
      } catch (err) {
        alert('Approval failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const rejectRent = async (id) => {
    if (window.confirm('Reject this rent request?')) {
      try {
await axios.put(`http://localhost:5000/api/rents/reject/${id}`, {}, { withCredentials: true });
        fetchRents();
      } catch (err) {
        alert('Rejection failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const markReturned = async (id) => {
    if (window.confirm('Mark this rent as returned?')) {
      try {
await axios.put(`http://localhost:5000/api/rents/return/${id}`, {}, { withCredentials: true });        fetchRents();
      } catch (err) {
        alert('Return failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center fw-bold">Admin Rent Management</h3>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : rents.length === 0 ? (
        <div className="text-center">No rent records found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Rent Date</th>
                <th>Expected Return</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Total Cost</th>
                <th>Late Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rents.map((rent) => (
                <tr key={rent._id}>
                  <td>{rent.user?.name || 'N/A'}</td>
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
                  <td>{rent.paymentStatus}</td>
                  <td>{rent.totalCost}</td>
                  <td>{rent.lateFee ? `Rs. ${rent.lateFee}` : '-'}</td>
                  <td>
                    {rent.rentStatus === 'pending' && (
                      <>
                        <button className="btn btn-sm btn-success me-1" onClick={() => approveRent(rent._id)}>Approve</button>
                        <button className="btn btn-sm btn-danger" onClick={() => rejectRent(rent._id)}>Reject</button>
                      </>
                    )}
                    {rent.rentStatus === 'approved' && (
                      <button className="btn btn-sm btn-primary" onClick={() => markReturned(rent._id)}>Mark Returned</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRentManagement;

