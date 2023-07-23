import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from '../Search/Search'
import Results from '../Results/Results'
import Album from '../Album/Album'
import './App.css';

function App() {
  const [query, setQuery] = useState('')
  
  return (
    <div className="App">
      <Search setQuery={setQuery}/>
      <Routes>
        <Route path='/'/>
        <Route path='/albums' element={<Results query ={query}/>}/>
        <Route path='/albums/:id' element={<Album/>}/>
      </Routes>
    </div>
  );
}

export default App;
