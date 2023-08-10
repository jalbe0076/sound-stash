import './Collections.css';
import Card from '../Card/Card';
import UserContext from '../UserContext/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const { currentUser, isUserLoggedIn } = useContext(UserContext)
  const { collections } = currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    !isUserLoggedIn && navigate('/')
  }, [])

  const savedAlbums = collections.map(album => {
    return (<Card key={album.masterId} result={album} />)
  });

  return (
    <>
    <h2 className='sub-title'>Collections</h2>
    <div className='album--grid'>
      {savedAlbums.length ? savedAlbums : <h2>No albums in collection</h2>}
    </div>
    </>
  );
};

export default Collections;
