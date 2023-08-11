import './Collections.css';
import Card from '../Card/Card';
import UserContext from '../UserContext/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const { currentUser, setCurrentUser, isUserLoggedIn } = useContext(UserContext)
  const { collections } = currentUser;
  const navigate = useNavigate();

   const handleDeleteAlbum = (albumId) => {
    // Filter out the album with the given albumId from the collections
    const updatedCollections = collections.filter(album => album.masterId !== albumId);
    // Update the state with the new collections array
    setCurrentUser(prevUser => ({
      ...prevUser,
      collections: updatedCollections
    }));
  };

  useEffect(() => {
    !isUserLoggedIn && navigate('/')
  }, [])

  const savedAlbums = collections.map(album => (
    <Card key={album.masterId} result={album} onDelete={handleDeleteAlbum} />
  ));

  return (
    <div className='album--grid'>
      {savedAlbums.length ? savedAlbums : <h2>No albums in collection</h2>}
    </div>
  );
};

export default Collections;
