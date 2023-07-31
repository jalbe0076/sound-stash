import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({result}) {
  const onImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"
  }
  
  return (
    <Link to={`/albums/${result.masterId}`} className='results--card' id={result.masterId}>
      <img className='results--image' src={result.thumb ? result.thumb : process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"} alt={`${result.title} by ${result.artist}`} onError={onImageError}/>
      <p className='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
      <p className='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
    </Link>
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