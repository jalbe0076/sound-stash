
import React, { useState, useEffect } from 'react';
import './App.css';
import Recommended from '../Recommended/Recommended';
import { userData } from './userData';
import { getTrendingAlbums, getRecommendedAlbums } from '../api';
import Nav from '../Nav/Nav';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Discover from '../Discover/Discover';
import Collections from '../Collections/Collections';
import Journal from '../Journal/Journal';
import EmptyState from '../EmptyState/EmptyState';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Album from '../Album/Album';
import Login from '../Login/Login';
import mockUsers from '../MockData/mockusers';

function App() {

  const [recommendedData, setRecommendedData] = useState()
  const [user, setUser] = useState(userData[0])

  useEffect(() => {
      getTrendingAlbums()
        .then(data => setRecommendedData(data))
        .catch(err => console.error(err))
  }, [])

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username, password) => {
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setLoggedInUser(user.username);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <Nav />
      <Search/>
      <main className="App">
        <Routes>
          {/* <Route path="/" /> */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path='/trending' element={<Recommended recommendedData={recommendedData} />}/>
          <Route path="/journal" element={<Journal />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/discover" element={<Discover />} />
          <Route path='/search/:query/:page' element={<Results/>}/>
          <Route path='/albums/:id' element={<Album/>}/>
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </main>
          
    </>
  );
};

export default App;



