import React, {useState} from "react";
import './Search.css'
import { useNavigate } from "react-router-dom";

function Search({setQuery}) {
  const [inputValue, setInput] = useState('')
  const navigate = useNavigate()
  
  function handleClick(event) {
    event.preventDefault()
    setQuery(inputValue)
    setInput('')
    navigate('/albums')
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