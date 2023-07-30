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
  const {setCurrentUser, isUserLoggedIn} = useContext(UserContext) 

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

    setCurrentUser(prev => ({
      ...prev,
      collections: [...prev.collections, newAlbum]
    }))
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
            {!modal && <button className="journal-button" onClick={showModal}>Add to Journal Entry</button>}
          </div>
        }
    
        <div className="album-tracklist-container">
          {tracklist && tracklist.length > 0 && (
            <div className="tracklist-container">
                  <h3 className="tracklist-title">Tracklist:</h3>
              {tracklist.map((track, index) => (
                <p key={index}>{track}</p>
              ))}
            </div>
          )}
    
          <div className="album-details-container">
            <img className="cover-image" src={coverImg} alt={`Cover art for ${title}`} />
            <h2 className="album-title">{title}</h2>
            <p>Artist: {artist}</p>
            <p>Release Date: {releaseDate}</p>
            <p>Genre: {genre}</p>
            {styles && styles.length > 0 && <p>Styles: {styles.join(', ')}</p>}
          </div>
        </div>
    
        {modal && <Form id={id} {...albumDetails} showModal={showModal} />}
      </div>
    );
  }
}
    
export default Album;
