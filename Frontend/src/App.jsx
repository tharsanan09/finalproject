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
        <Route path="/admin/users" element={<AdminUserTable></AdminUserTable>} />
        <Route path="/publish" element={<PublishBook></PublishBook>} />
        <Route path="/admin/bookmanagement" element={<BookManagement></BookManagement>} />
        
        {/* Add more routes as needed */}
        
      </Routes>
    
    </>
  )
};

export default App;
