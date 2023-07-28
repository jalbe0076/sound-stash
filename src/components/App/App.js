import React, { useState, useEffect } from 'react'
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
  const [trendingData, setTrendingData] = useState()
  const [currentUser, setCurrentUser] = useState(false);

  const handleLogin = (username, password) => {
    const user = mockUsers.find(user => user.username === username && user.password === password);

    if (user) {
      setCurrentUser(user);
    } 
  };

  useEffect(() => {
      getTrendingAlbums()
        .then(data => setTrendingData(data))
        .catch(err => console.error(err))
  }, [])
  
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Nav />
      <Search/>
      <main className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<Recommended trendingData={trendingData} />}/>
          <Route path="/journal" element={<Journal/>} />
          <Route path="/collections" element={<Collections/>} />
          <Route path="/discover" element={<Discover trendingData={trendingData} />} />
          <Route path='/search/:query/:page' element={<Results/>} />
          <Route path='/albums/:id' element={<Album />}/>
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
};

export default App;
