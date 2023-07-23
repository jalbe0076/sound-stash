import React from 'react'
import { Link } from 'react-router-dom'
import './Album.css'

const Album = ({ id, title, coverImg }) => {

    return (
        <Link to={`album/${id}`} className='link'>
            <div className='album'>
                <img src={coverImg} alt={`cover art for ${title}`}/>
                <p>{title}</p>
            </div>
        </Link>
        
    )
}

export default Album