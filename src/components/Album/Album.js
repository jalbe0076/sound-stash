import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../../api';
import Form from '../Form/Form';
import './Album.css';
import UserContext from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

function Album({handleApiError}) {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const {currentUser, setCurrentUser, isUserLoggedIn} = useContext(UserContext) 
  const navigate = useNavigate()

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
      navigate('/collections')
    }

    if (currentUser.collections.length && currentUser.collections.every(item => item.masterId !== id)) {
      setCurrentUser(prev => ({
      ...prev,
      collections: [...prev.collections, newAlbum]
      }))
      navigate('/collections')
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
      <div className='album-details'>
        {isUserLoggedIn && 
          <div className="buttons-container">
            <button className="add-to-collections-button" onClick={() => handleAddToCollections()}>Add to Collections</button>

            {!modal && <button className="journal-button" onClick={showModal}>Add to Journal Entry</button>}
          </div>
        }
        <div className="album-container">
          <div className="album-details-container">
            <h2 className="album-title">{title}</h2>
            <p className='album-artist'>By: {artist}</p>
            <img className="cover-image" src={coverImg} alt={`Cover art for ${title}`} />
            <p>Release Date: {releaseDate}</p>
            <p>Genre: {genre}</p>
            {styles && styles.length > 0 && <p>Styles: {styles.join(', ')}</p>}
          </div>
          {tracklist && tracklist.length > 0 && (
            <div className="tracklist-container">
              <h3 className="tracklist-title">Tracklist:</h3>
              {tracklist.map((track, index) => (
                <p key={index}>{track}</p>
              ))}
            </div>
          )}          
        </div>
        {modal && <Form id={parseInt(id)} {...albumDetails} showModal={showModal} />}
      </div>
    );
  }
}

Album.propTypes = {
  handleApiError: PropTypes.func.isRequired,
};

export default Album;


