import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';
import Form from '../Form/Form';
import './Album.css';
import UserContext from '../UserContext/UserContext';

function Album({handleApiError}) {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const {currentUser, setCurrentUser, isUserLoggedIn} = useContext(UserContext) 

  useEffect(() => {
    setLoading(true);
    getAlbumDetails(id)
      .then(data => {
        setAlbumDetails(data);
        setLoading(false);
      })
      .catch(error => {
        handleApiError(error);
      })
      
      return () => setLoading(false);
  }, [id]);

  const handleAddToCollections = () => {
    const { title, artist, coverImg } = albumDetails

    const newAlbum = {
      masterId: id,
      title: title,
      artist: artist,
      thumb: coverImg
    }

    if (!currentUser.collections.length) {
      setCurrentUser(prev => ({
      ...prev,
      collections: [...prev.collections, newAlbum]
      }))
    }

    if (currentUser.collections.length && currentUser.collections.every(item => item.masterId !== id)) {
      setCurrentUser(prev => ({
      ...prev,
      collections: [...prev.collections, newAlbum]
      }))
    }
  
  }

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

  if(!isLoading) {
    return (
      <div>
        {isUserLoggedIn && 
          <div className="buttons-container">
            <button className="add-to-collections-button" onClick={() => handleAddToCollections()}>Add to Collections</button>
            {!modal && <button className="journal-button" onClick={showModal}>Add A Journal Entry</button>}
          </div>}
        <img classname="cover-image" src={coverImg} alt={`Cover art for ${title}`} />
        <h2>{title}</h2>
        <p>Artist: {artist}</p>
        <p>Release Date: {releaseDate}</p>
        <p>Genre: {genre}</p>
        {styles && styles.length > 0 && <p>Styles: {styles.join(', ')}</p>}
        {tracklist && tracklist.length > 0 && (
          <>
            <h3>Tracklist:</h3>
            <ol>
              {tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </>
        )}
        {modal && <Form id={id} {...albumDetails} showModal={showModal} />}
      </div>
    );
  }
}

export default Album;
