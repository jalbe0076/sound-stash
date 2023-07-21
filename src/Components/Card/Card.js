import React from 'react'
import './Card.css'

function Card({result}) {
  return ((<div id={result.masterId}>
    <img className='results--image' src={result.thumb}/>
    <p className='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
    <p className='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
  </div>))
}

export default Card