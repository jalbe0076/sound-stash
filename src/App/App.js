import React, {useState} from 'react'
import Search from '../Search/Search'
import './App.css';

function App() {
  const [results, setResults] = useState([])
  
  return (
    <div className="App">
      <Search results={results} setResults={setResults}/>
    </div>
  );
}

export default App;
