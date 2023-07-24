import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; 
import mockUsers from '../src/mockusers'; 

const App = () => { 
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

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
          {loggedInUser ? (
            <div>
              <p>Welcome, {loggedInUser}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        </header>
      </Router>
    </div>
  );
};

export default App;
