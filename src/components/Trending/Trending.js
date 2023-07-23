import React from 'react'
import Album from '../Album/Album'
import './Trending.css'

const Trending = ({ trendingData }) => {
    
    if (trendingData) {
        const trendingAlbums = trendingData.results.map(item => <Album key={item.id} title={item.title} coverImg={item.cover_image}/>)

        return (
            <section className='trendingContainer'>
                {trendingAlbums}
            </section>
        )
    }
}

export default Trending