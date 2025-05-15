import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/SideBar/SideBar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const url = "http://localhost:5000";

  return (
    <div className='app'>
      <ToastContainer />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='main'>
        <SideBar isOpen={sidebarOpen} />
        <div className='content'>
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
