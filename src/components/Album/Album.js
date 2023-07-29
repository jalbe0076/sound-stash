import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';
import Form from '../Form/Form';
import './Album.css'; 

function Album() {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAlbumDetails(id)
      .then(data => {
        setAlbumDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching album details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToJournal = () => {
    console.log('Album added to Journal!');
  };

  const handleAddToCollections = () => {
    console.log('Album added to Collections!');
  };

  const showModal = () => {
    setModal(prevModal => !prevModal);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!albumDetails) {
    return <div>Album not found.</div>;
  }

  const { title, artist, releaseDate, genre, styles, tracklist, coverImg } = albumDetails;
  
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
        <button className="add-to-collections-button" onClick={handleAddToCollections}>
          Add to Collections
        </button> {!modal && <button onClick={showModal}>Add a journal entry </button>}
        {modal && <Form {...albumDetails} showModal={showModal} />}
      </div>
    </div>
  );
}

export default Album;
