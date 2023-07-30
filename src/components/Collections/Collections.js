import './Collections.css';
import Card from '../Card/Card';
import UserContext from '../UserContext/UserContext';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    <div className='album--grid'>
      {savedAlbums.length ? savedAlbums : <h2>No albums in collection</h2>}
    </div>
  );
};

Collections.propTypes = {
  currentUser: PropTypes.shape({
    collections: PropTypes.arrayOf(PropTypes.shape({
      masterId: PropTypes.number.isRequired
    })).isRequired,
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default Collections;
