import React, { useState } from 'react';
import './Login.css';
import logo from './Assets/logo.png';
import mockUsers from '../src/mockusers';
import { useNavigate } from 'react-router-dom'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username, password);
      setUsername('');
      setPassword('');
      setLoginError('');
      navigate('/'); 
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
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
  );
};

export default Login;
