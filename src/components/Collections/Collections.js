import './Collections.css';
import Card from '../Card/Card';

const Collections = ({currentUser}) => {
  const { collections } = currentUser;

  const savedAlbums = collections.map(album => {
    console.log('album', album)
    return (<Card key={album.masterId} result={album} />)
  });

  return (
    <>
      {savedAlbums}
    </>
  );
};

export default Collections;
