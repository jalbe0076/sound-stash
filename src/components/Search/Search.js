import React, {useState} from "react";
import './Search.css'
import { useNavigate } from "react-router-dom";

function Search() {
  const [inputValue, setInput] = useState('')
  const [invalidQuery, setInvalidQuery] = useState(false)
  const navigate = useNavigate()

  function handleClick(event) {
    event.preventDefault()
    if (inputValue !== '') {
      setInvalidQuery(false)
      setInput('')
      navigate(`/search/${inputValue}/1`)
    } else {
      setInvalidQuery(true)
    }
  }

  return (
    <form className="search--form" name="search">
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
      {invalidQuery && <p className="invalid-query">Please enter a valid search query</p>}
    </form>
  );
}

export default Search;