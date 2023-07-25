import './App.css';
import Nav from '../Nav/Nav';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Discover from '../Discover/Discover';
import Collections from '../Collections/Collections';
import Journal from '../Journal/Journal';
import EmptyState from '../EmptyState/EmptyState';
import Login from '../Login/Login';
import mockUsers from '../MockData/mockusers';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username, password) => {
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setLoggedInUser(user.username);
    } else {
      alert('Invalid username or password');
    }
  };
  
  // const handleLogout = () => {
  //   setLoggedInUser(null);
  // };

  return (
    <>
      <Nav />
      <main className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/trending" />  
            {/* This is what "itMatched leaf route at location "/trending" does not have an element" */}
            <Route path="/journal" element={<Journal />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="*" element={<EmptyState />} />
          </Routes>
      </main>
          
    </>
  );
};

export default App;



