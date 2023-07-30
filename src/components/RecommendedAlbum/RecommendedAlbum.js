import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './RecommendedAlbum.css'

const RecommendedAlbum = ({ id, title, coverImg }) => {

    return (
        <Link to={`/albums/${id}`} className='link'>
            <div className='album'>
                <img src={coverImg} alt={`cover art for ${title}`}/>
                <p>{title}</p>
            </div>
        </Link>
        
    )
}

RecommendedAlbum.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
  };

export default RecommendedAlbum