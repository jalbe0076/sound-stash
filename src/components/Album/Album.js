import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';
import Form from '../Form/Form';
import './Album.css';
import UserContext from '../UserContext/UserContext';
import { toast } from 'react-toastify';

function Album({ handleApiError }) {
  const { id } = useParams();
  const masterId = parseInt(id);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const { currentUser, setCurrentUser, isUserLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getAlbumDetails(masterId)
      .then(data => {
        setAlbumDetails(data);
        setLoading(false);
      })
      .catch(error => {
        handleApiError(error);
        setLoading(false); 
      });

    return () => {
      setLoading(false);
    };
  }, [id]);
  
  const notifySaved = () => toast('Album Saved!')
  const notifyDelete = () => toast('Album Deleted!')

  const handleAddToCollections = () => {
    const { title, artist, coverImg } = albumDetails;

    const newAlbum = {
      masterId,
      title,
      artist,
      thumb: coverImg,
    };

    if (!currentUser.collections.length || currentUser.collections.every(item => item.masterId !== masterId)) {
      setCurrentUser(prev => ({
        ...prev,
        collections: [...prev.collections, newAlbum],
      }));
      notifySaved();
    }
  };

  const handleDeleteFromCollections = () => {
    const updatedCollections = currentUser.collections.filter(album => album.masterId !== masterId);
    setCurrentUser(prevUser => ({
      ...prevUser,
      collections: updatedCollections,
    }));
    notifyDelete();
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

  const { title, artist, releaseDate, genre, styles, tracklist, coverImg, video } = albumDetails;

  const isAlbumInCollections = currentUser.collections.some(item => item.masterId === masterId);

  return (
    <div className="album-details">
      <div className="album-container">
        <div className="album-details-container">
          <h2 className="album-title">{title}</h2>
          <p className="album-artist">By: {artist}</p>
          <img className="cover-image" src={coverImg} alt={`Cover art for ${title}`} />
          <p>Release Date: {releaseDate}</p>
          <p>Genre: {genre}</p>
          {styles && styles.length > 0 && <p>Styles: {styles.join(', ')}</p>}
        </div>
        {isUserLoggedIn && (
          <div className="buttons-container">
            {isAlbumInCollections ? (
              <button className="delete-from-collections-button" onClick={handleDeleteFromCollections}>
                Delete from Collections
              </button>
            ) : (
              <button className="add-to-collections-button" onClick={handleAddToCollections}>
                Add to Collections
              </button>
            )}
            {!modal && <button className="journal-button" onClick={showModal}>Add to Journal Entry</button>}
          </div>
        )}
        {tracklist && tracklist.length > 0 && (
          <div className="tracklist-container">
            <h3 className="tracklist-title">Tracklist:</h3>
            {tracklist.map((track, index) => (
              <p key={index}>{track}</p>
            ))}
          </div>
        )}
        {modal && <Form id={masterId} {...albumDetails} showModal={showModal} />}
        {video && <iframe className="video" src={video} allowFullScreen />}
      </div>
    </div>
  );
}

Album.propTypes = {
  handleApiError: PropTypes.func.isRequired,
};

export default Album;
