import React from 'react';
import './Login.css';
import backgroundImage from './Assets/Band2.png';
import logo from './Assets/logo.png';

const Login = () => {
  const loginContainerStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="login-container" style={loginContainerStyles}>
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
