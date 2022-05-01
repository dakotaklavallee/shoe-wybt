import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/Landings/HomePage';
import LoginPage from './Components/Landings/LoginPage';
import Navbar from './Components/Constants/Navbar';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div style={{height:"100vh"}}>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
