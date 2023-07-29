import './Collections.css';
import Card from '../Card/Card';
import UserContext from '../UserContext/UserContext';
import { useContext } from 'react';

const Collections = () => {
  const {currentUser} = useContext(UserContext)
  const { collections } = currentUser;

  const savedAlbums = collections.map(album => {
    return (<Card key={album.masterId} result={album} />)
  });

  return (
    <div className='album--grid'>
      {savedAlbums.length ? savedAlbums : <h2>No albums in collection</h2>}
    </div>
  );
};

export default Collections;
