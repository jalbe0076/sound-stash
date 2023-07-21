import React, {useState} from "react";
import './Search.css'

function Search({setResults}) {
  const [inputValue, setInput] = useState('')

  function handleClick(event) {
    event.preventDefault()
    setResults('Yea')
    setInput('')
  }

  return (
    <form className="search--form">
      <div className='search--container'>
        <input
          className='search--input'
          type='text'
          placeholder="Search albums"
          value= {inputValue}
          onChange= {event => setInput(event.target.value)}  
        />
        <button className='search--button'type='submit' onClick={event => handleClick(event)}></button>
      </ div>
    </form>
  );
}

export default Search;