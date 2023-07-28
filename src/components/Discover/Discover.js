import './Discover.css';
import React, { useState, useEffect, useContext } from "react"
import UserContext from '../UserContext/UserContext';
import { getAlbumsByMasterId, getAlbumsByGenre } from '../../api'
import RecommendedAlbum from '../RecommendedAlbum/RecommendedAlbum';


const Discover = ({ trendingData }) => {
  const { currentUser } = useContext(UserContext)
  const [ recommendedData, setRecommendedData ] = useState()

  useEffect(() => {
    if (!currentUser || !currentUser.collections.length) {
      setRecommendedData(trendingData)
    } else {
      const randomAlbum = currentUser.collections[Math.floor(Math.random() * currentUser.collections.length)]
      getAlbumsByMasterId(randomAlbum.masterId)
      .then(data => getAlbumsByGenre(data.genres[0]))
      .then(data => setRecommendedData(data))
    }
  }, [])
  
  if (recommendedData) {
    const recommendedAlbums = recommendedData.results.map(item => <RecommendedAlbum key={item.id} id={item.id} title={item.title} coverImg={item.cover_image}/>)

    return (
      <section className='recommendedContainer'>
          <h2>{'Yours to discover!'}</h2>
          {recommendedAlbums}
      </section>
    )
  }
};

export default Discover;
