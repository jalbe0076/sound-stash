import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';
import './Album.css'; 

function Album() {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setLoading] = useState(true); // isLoading state
  const [isAlbumLoaded, setAlbumLoaded] = useState(false)

  useEffect(() => {
    setLoading(true); // isLoading:true while fetching data
    getAlbumDetails(id)
      .then(data => {
        setAlbumDetails(data);
        setLoading(false); // isLoading:false after data fetch
        setAlbumLoaded(true);
      })
      .catch(error => {
        setLoading(false); //  isLoading:false ...case of error
        alert(error.message);
      });
  }, [id]);

  if (isLoading) {
    return  <div>Loading...</div>; // data being fetched..
  }

  if (!albumDetails) {
    return <div>Album not found.</div>; //null after fetch
  }

  const { title, artist, releaseDate, genre, styles, tracklist, coverImg } = albumDetails;

  const handleAddToJournal = () => {
    console.log("Album added to Journal!");
  };

  
  const handleAddToCollections = () => {
    console.log("Album added to Collections!");
  };

  return (
    <div>
      <img src={coverImg} alt={`Cover art for ${title}`} />
      <h2>{title}</h2>
      <p>Artist: {artist}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Genre: {genre}</p>
      <p>Styles: {styles.join(', ')}</p>
      {tracklist && tracklist.length > 0 && (
        <>
         <h3>Tracklist:</h3>
          <ul>
            {tracklist.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        </>
      )}

      
      <div className="buttons-container">
        <button className="add-to-journal-button">Add to Journal</button>
        <button className="add-to-collections-button">Add to Collections</button>
      </div>
    </div>
  );
}

export default Album;
