import React, {useState} from 'react';
import './App.css';
import Login from './Login';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username, password) => {
    if (username === 'user1' && password === 'password') {
      setLoggedInUser(username);
    } else {
      alert('Invalid username or password');
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      {loggedInUser ? (
          <h1>Welcome, {loggedInUser}!</h1>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;

