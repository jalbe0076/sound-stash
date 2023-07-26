import './Collections.css';
import { getAlbumsByMasterId } from '../api';
import { useEffect, useState } from 'react';

const Collections = ({currentUser}) => {
  const { collections } = currentUser;
  const [userCollection, setUserCollection] = useState([])
console.log('collection IDS', collections)

  useEffect(() => {
    collections.forEach(album => {
      console.log(album)
      getAlbumsByMasterId(album)
        .then(data => {
          console.log(data)
          setUserCollection(prevCollection => [...prevCollection, data])
        })
    })
  }, [])
  console.log('userCollection', userCollection)
  
  

  return <h2>I'm the collection</h2>
};

export default Collections;
