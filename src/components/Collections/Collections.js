import './Collections.css';
import { getAlbumsByMasterId } from '../api';
import { useEffect, useState } from 'react';

const Collections = ({user}) => {
  const { collections } = user;
  const [userCollection, setUserCollection] = useState([])

  // useEffect(() => {

  // }, )
  
  

  return <h2>I'm the collection</h2>
};

export default Collections;
