import './Collections.css';
import Card from '../Card/Card';

const Collections = ({currentUser}) => {
  const { collections } = currentUser;

  const savedAlbums = collections.map(album => {
    return (<Card key={album.masterId} result={album} />)
  });

  return (
    <div className='album--grid'>
      {savedAlbums}
    </div>
  );
};

export default Collections;
