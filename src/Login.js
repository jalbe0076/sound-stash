import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="navbar">
        <input type="text" placeholder="Username" className="username-field" />
        <input type="password" placeholder="Password" className="password-field" />
        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
