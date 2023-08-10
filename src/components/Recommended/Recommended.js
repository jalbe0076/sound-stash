import React from 'react'
import RecommendedAlbum from '../RecommendedAlbum/RecommendedAlbum'
import PropTypes from 'prop-types';
import './Recommended.css'

const Recommended = ({ trendingData }) => {
    
    if (trendingData) {
        const recommendedAlbums = trendingData.results.map(item => <RecommendedAlbum key={item.id} id={item.id} title={item.title} coverImg={item.cover_image}/>)

        return (
          <>
            <h2 className='sub-title'>{'Vinyl albums trending today'}</h2>
            <section className='recommendedContainer'>
                {recommendedAlbums}
            </section>
          </>
        )
    }
}

Recommended.propTypes = {
    trendingData: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          cover_image: PropTypes.string.isRequired,
        })
      ),
    }),
  };

export default Recommended