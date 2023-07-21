import React, {useState} from "react";
import './Search.css'

function Search({setResults}) {
  const [inputValue, setInput] = useState('')

  function searchAlbums(query) {
    return fetch(`https://api.discogs.com/database/search?q=${query}&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl`)
      .then(res => {
        if (!res.ok) {
        throw new Error('Trailer not found.')
        }
        return res.json()})
      .then(data => data.results)
      .then(results => {
        return results.map(result => {
          const splitTitle = result.title.split(' - ')
          const [artist, title] = splitTitle
          return {
            masterId: result.master_id,
            title,
            artist,
            thumb: result.thumb,
            coverImage: result.cover_image
          }
        })
      })
  }
  
  function handleClick(event) {
    event.preventDefault()
    searchAlbums(inputValue)
      .then(results => setResults(results))
      .catch(error => alert(error.message))
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