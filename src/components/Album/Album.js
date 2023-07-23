import React from 'react'
import { Link } from 'react-router-dom'

const Album = ({ id, title, coverImg }) => {

    return (
        <Link to={`album/${id}`}>
            <div className='album'>
                <img src={coverImg} alt={`cover art for ${title}`}/>
                <p>{title}</p>
            </div>
        </Link>
        
    )
}

export default Album