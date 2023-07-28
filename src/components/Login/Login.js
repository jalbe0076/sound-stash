import React, { useState } from 'react';
import './Login.css';
import mockUsers from '../MockData/mockusers';
import { useNavigate } from 'react-router-dom'; 

const Login = ({ onLogin, currentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser) {
      onLogin(username, password);
      setUsername('');
      setPassword('');
      setLoginError('');
      navigate('/trending'); // next state
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <header className="App-header">
    <div className="login-container">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="sound-stash logo" className="logo" />
      </div>
      <div className="navbar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="username-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="password-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>
    </div>
    </header>
  );
};

export default Login;
