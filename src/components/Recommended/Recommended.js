import React from 'react'
import Album from '../Album/Album'
import './Recommended.css'

const Recommended = ({ trendingData }) => {
    
    if (trendingData) {
        const recommendedAlbums = trendingData.results.map(item => <Album key={item.id} id={item.id} title={item.title} coverImg={item.cover_image}/>)

        return (
            <section className='recommendedContainer'>
                {/* a title conditionally rendered for trending or recommended */}
                {recommendedAlbums}
            </section>
        )
    }
}

export default Recommended