import React, { useEffect, useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import axios from 'axios';

const AdminBorrowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/borrow-requests');
        setRequests(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/borrow-requests/${id}`, { status: 'approved' });
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: 'approved' } : req
      ));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-4">
      <h2>Borrow Requests</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book</th>
            <th>User</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{request.bookId.title}</td>
              <td>{request.userDetails.fullName}</td>
              <td>
                {request.userDetails.email}<br/>
                {request.userDetails.phoneNumber}
              </td>
              <td>
                <Badge 
                  bg={
                    request.status === 'approved' ? 'success' : 
                    request.status === 'rejected' ? 'danger' : 'warning'
                  }
                >
                  {request.status}
                </Badge>
              </td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" className="ms-2">
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};