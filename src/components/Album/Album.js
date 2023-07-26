import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';

function Album() {
  const {id} = useParams()
  const [albumDetails, setAlbumDetails] = useState(null);
  
  useEffect(() => {
    getAlbumDetails(id)
      .then(data => setAlbumDetails(data))
      .catch(error => alert(error.message));
  }, [id]);

  if (!albumDetails) {
    return <div>Loading...</div>;
  }
  const { title, artist, releaseDate, label, genre, styles, tracklist, coverImg } = albumDetails;

  return (
    <div>
    <img src={coverImg} alt={`Cover art for ${title}`} />
    <h2>{title}</h2>
    <p>Artist: {artist}</p>
    <p>Release Date: {releaseDate}</p>
    <p>Label: {label}</p>
    <p>Genre: {genre}</p>
    <p>Styles: {styles.join(', ')}</p>  
    <h3>Tracklist:</h3>
    <ul>
      {tracklist.map((track, index) => (
        <li key={index}>{track}</li>
      ))}
    </ul>
  </div>
  );
}

export default Album
