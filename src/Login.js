import React from 'react';
import './Login.css';
import logo from './Assets/logo.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar">
        <input type="text" placeholder="Username" className="username-field" />
        <input type="password" placeholder="Password" className="password-field" />
        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
