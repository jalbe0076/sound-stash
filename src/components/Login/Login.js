import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../UserContext/UserContext';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 
  const {currentUser, isUserLoggedIn} = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    (() => {
      onLogin(username, password);
      setUsername('');
      setPassword('');
      setLoginError('');
      setLoadingUser(true);
    })()

    if(!isUserLoggedIn) {
      setLoginError('Invalid username or password');
    }
  };

  const handleDemoUsers = (e) => {
    const userType = e.target.value;
    
    if(userType === 'user1' || userType === 'user2') {
      setUsername(userType);
      setPassword('sound-stash');
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    if(isUserLoggedIn) {
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
        <form className='login-form' onSubmit={handleSubmit}>
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
          <button className="standard-btn" type="submit">LOGIN</button>
        </form>
        <div className='demo-user-container'>
          <button className="standard-btn" value='no-user' onClick={e => handleDemoUsers(e)}>DEMO NO USER</button>
          <button className="standard-btn" value='user1' onClick={e => handleDemoUsers(e)}>DEMO USER 1</button>
          <button className="standard-btn" value='user2' onClick={e => handleDemoUsers(e)}>DEMO USER 2</button>
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    </div>
    </header>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
