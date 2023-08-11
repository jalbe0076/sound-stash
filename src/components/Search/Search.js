import React, {useState} from "react";
import './Search.css'
import { useNavigate } from "react-router-dom";

function Search({ theme }) {
  const [inputValue, setInput] = useState('')
  const navigate = useNavigate()

  function handleClick(event) {
    event.preventDefault()
    setInput('')
    navigate(`/search/${inputValue}/1`)
  }

  return (
    <form className="search--form" name="search" data-theme={theme}>
      <div className='search--container'>
        <input
          className='search--input'
          name="search"
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