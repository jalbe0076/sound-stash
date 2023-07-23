import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from '../Search/Search'
import Results from '../Results/Results'
import Album from '../Album/Album'
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Search/>
      <Routes>
        <Route path='/'/>
        <Route path='/search/:query/:page' element={<Results/>}/>
        <Route path='/albums/:id' element={<Album/>}/>
      </Routes>
    </div>
  );
}

export default App;
