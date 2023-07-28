import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../UserContext/UserContext';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 
  const [currentUser] = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    (() => {
      onLogin(username, password);
      setUsername('');
      setPassword('');
      setLoginError('');
      setLoadingUser(true)
    })()

    if(!currentUser) {
      setLoginError('Invalid username or password');
    }
  };

  useEffect(() => {
    if(currentUser) {
      navigate('/');
    }

    return () => {setLoadingUser(false)}
  }, [loadingUser])

  return (
    <header className="App-header">
    <div className="login-container">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="sound-stash logo" className="logo" />
      </div>
      <div className="navbar">
        <form onSubmit={handleSubmit}>
          <input
            name='username'
            autoComplete='username'
            type="text"
            placeholder="Username"
            className="username-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name='password'
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
