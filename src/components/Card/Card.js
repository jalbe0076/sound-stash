import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({result, onDelete}) {
  const onImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"
  }
  
  return (
  <div className='results--card' id={result.masterId}>
    <Link to={`/albums/${result.masterId}`}>
      <img className='results--image' src={result.thumb ? result.thumb : process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"} alt={`${result.title} by ${result.artist}`} onError={onImageError}/>
      <p className='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
      <p className='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
    </Link>
    <button className="delete-button" onClick={() => onDelete(result.masterId)}> Remove </button>
  </div>
  )
}

Card.propTypes = {
  result: PropTypes.shape({
    masterId: PropTypes.number.isRequired,
    thumb: PropTypes.string,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
};


export default Card;