import './Discover.css';
import React, { useState, useEffect, useContext } from "react"
import PropTypes from 'prop-types'; 
import UserContext from '../UserContext/UserContext';
import { getAlbumsByMasterId, getAlbumsByGenre } from '../../api'
import RecommendedAlbum from '../RecommendedAlbum/RecommendedAlbum';
import { useNavigate } from 'react-router-dom';


const Discover = ({ trendingData, handleApiError }) => {
  const { currentUser, isUserLoggedIn } = useContext(UserContext)
  const [ recommendedData, setRecommendedData ] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    !isUserLoggedIn && navigate('/')
  }, [])

  useEffect(() => {
    if (!currentUser || !currentUser.collections.length) {
      setRecommendedData(trendingData.results)
    } else {
      const randomAlbum = currentUser.collections[Math.floor(Math.random() * currentUser.collections.length)]
      getAlbumsByMasterId(randomAlbum.masterId)
      .then(data => getAlbumsByGenre(data.genres[0]))
      .then(data => {
        const maxResults = data.results.length < 10 ? data.results.length : 10
        const recommendedAlbumsData = []
        for (let i = 0; recommendedAlbumsData.length < maxResults; i++) {
          const randomAlbum = data.results[Math.floor(Math.random() * data.results.length)]
          if (!recommendedAlbumsData.find(album => album.id === randomAlbum.id)) {
            recommendedAlbumsData.push(randomAlbum)
          }
        }

        setRecommendedData(recommendedAlbumsData)
      })
      .catch(error => handleApiError(error))
    }
  }, [])
  
  if (recommendedData) {
    const recommendedAlbums = recommendedData.map(item => <RecommendedAlbum key={item.id} id={item.id} title={item.title} coverImg={item.cover_image}/>)

    return (
      <section className='recommendedContainer'>
          <h2>{'Yours to discover!'}</h2>
          {recommendedAlbums}
      </section>
    )
  }
};

Discover.propTypes = {
  trendingData: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cover_image: PropTypes.string.isRequired
        })).isRequired,
  }).isRequired,
  handleApiError: PropTypes.func.isRequired,
};

export default Discover;
