import React from 'react'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Books from './pages/Books.jsx'
import Register from './pages/Register.jsx'
import FeedbackForm from './pages/FeedBackForm.jsx'
import { Route, Routes,Router } from 'react-router-dom'
import UserDashboard from './pages/Dashboard/UserDashboard.jsx'
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx'
import BookDetails from './pages/BookDetails.jsx'
import BookDetails2 from './pages/BookDetails2.jsx'
import AdminUserTable from './pages/Dashboard/Managements/AdminUserTable.jsx'
import PublishBook from './pages/publishBook.jsx'
import BookManagement from './pages/Dashboard/Managements/BookManagement.jsx'
import AdminFeedback from './pages/Dashboard/Managements/AdminFeedback.jsx'
import UserDetailsForm from './pages/UserDetailsForm.jsx'
import AdminRentManagement from './pages/Dashboard/Managements/AdminRentManagement.jsx'


function App() {

  return (
    <>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/books" element={<Books></Books>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/feedback" element={<FeedbackForm></FeedbackForm>} />
        <Route path="/books/:id" element={<BookDetails></BookDetails>} />
        
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>} />
        <Route path="/user" element={<UserDashboard></UserDashboard>} />
        <Route path="/BookDetails" element={<BookDetails></BookDetails>} />
        <Route path="/BookDetail2" element={<BookDetails2></BookDetails2>} />
        <Route path="/publish" element={<PublishBook></PublishBook>} />
        <Route path="/userdetailsform" element={<UserDetailsForm></UserDetailsForm>} />
        
        {/* Admin Management Routes */}

        <Route path="/admin/users" element={<AdminUserTable></AdminUserTable>} />
        <Route path="/admin/bookmanagement" element={<BookManagement></BookManagement>} />
        <Route path="/admin/feedbacks" element={<AdminFeedback></AdminFeedback>} />
        <Route path="/admin/adminrentmanagement" element={<AdminRentManagement></AdminRentManagement>} />
        
        {/* User Management Routes */}  
        
        
      </Routes>
    
    </>
  )
};

export default App;
