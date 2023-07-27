import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

function Card({result}) {
  const onImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + "/images/broken-record.png"
  }
  
  return (
    <Link to={`/albums/${result.masterId}`} className='results--card' id={result.masterId}>
      <img className='results--image' src={result.thumb ? result.thumb : process.env.PUBLIC_URL + "/images/broken-record.png"} onError={onImageError}/>
      <p className='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
      <p className='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
    </Link>
  )
}
export default Card
