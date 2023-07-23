import React, { useState } from 'react';
import './App.css';
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
  
  return (
    <div className="App">
      <header className="App-header">
          <Login onLogin={handleLogin} />
      </header>
    </div>
  );
};

export default App;
