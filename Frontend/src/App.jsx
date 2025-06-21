import React from 'react'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Books from './pages/Books.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/books" element={<Books></Books>} />
        {/* Add more routes as needed */}
        
      
      </Routes>

    </>
  )
};

export default App;
