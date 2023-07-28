import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({ result }) {
  return (
    <div className='results--card' id={result.masterId}>
      <Link to={`/albums/${result.masterId}`}>
        <img className='results--image' src={result.thumb} alt={`cover art for ${result.title}`} />
        <p className='results--title'>{result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}</p>
        <p className='results--artist'>{result.artist.length > 20 ? result.artist.slice(0, 20) + '...' : result.artist}</p>
      </Link>
    </div>
  );
}

export default Card;
