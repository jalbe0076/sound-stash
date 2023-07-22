import React from 'react';
import './App.css';
import Login from './Login';
import Image from './Assets/Band2.png';

function App() {
  const appStyles = {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="App" style={appStyles}>
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
}

export default App;
