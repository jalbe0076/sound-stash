import React, { useState, useEffect } from 'react';
import './App.css';
import Recommended from '../Recommended/Recommended'
import { getTrendingAlbums } from '../../api'
import Nav from '../Nav/Nav';
import {  Routes, Route } from 'react-router-dom';
import Discover from '../Discover/Discover';
import Collections from '../Collections/Collections';
import Journal from '../Journal/Journal';
import EmptyState from '../EmptyState/EmptyState';
import Search from '../Search/Search'
import Results from '../Results/Results'
import Album from '../Album/Album'
import Login from '../Login/Login';
import UserContext from '../UserContext/UserContext'
import mockUsers from '../MockData/mockusers';



function App() {
  const [isDark, setIsDark] = useState(true)
  const [trendingData, setTrendingData] = useState()
  const [currentUser, setCurrentUser] = useState({ userId: null, username: '', password: '', journal: [], collections: [] });
  const [apiError, setApiError] = useState(null)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const handleLogin = (username, password) => {
    const user = mockUsers.find(user => user.username === username && user.password === password);

    if (user) {
      setCurrentUser(user);
      setIsUserLoggedIn(true)
    } 
  };

  useEffect(() => {
    getTrendingAlbums()
      .then(data => setTrendingData(data))
      .catch(err => {
        handleApiError(err)
    })

    return () => handleApiError(null)
  }, [])

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', isDark ? 'var(--background-dark)' : 'var(--background-light)');
  }, [isDark]);

  const handleApiError = (error) => {
    setApiError(error)
  }
  
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, isUserLoggedIn, setIsUserLoggedIn}}>
      {apiError ? <h2 style={{color: 'white'}}>{apiError.message}</h2> 
      : <div data-theme={isDark ? 'dark' : 'light'}>
        <Nav isDark={isDark} setIsDark={setIsDark} />
        <Search />
        <main className="App" >
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path='/' element={<Recommended trendingData={trendingData} />}/>
            <Route path="/journal" element={<Journal/>} />
            <Route path="/collections" element={<Collections/>} />
            <Route path="/discover" element={<Discover trendingData={trendingData} handleApiError={handleApiError} />} />
            <Route path='/search/:query/:page' element={<Results handleApiError={handleApiError} />} />
            <Route path='/albums/:id' element={<Album handleApiError={handleApiError} />}/>
            <Route path="*" element={<EmptyState />} />
          </Routes>
        </main>
      </div>}
    </UserContext.Provider>
  );
};

export default App;
