import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from '../Search/Search'
import Results from '../Results/Results'
import Album from '../Album/Album'
import './App.css';

function App() {
  const [results, setResults] = useState([])
  
  return (
    <div className="App">
      <Search results={results} setResults={setResults}/>
      <Routes>
        <Route path='/'/>
        <Route path='/albums' element={<Results results={results}/>}/>
        <Route path='/albums/:id' element={<Album/>}/>
      </Routes>
    </div>
  );
}

export default App;
