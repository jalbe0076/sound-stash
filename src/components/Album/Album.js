import React from 'react'

const Album = ({ title, coverImg }) => {

    return (
        <div className='album'>
            <img src={coverImg} alt={`cover art for ${title}`}/>
            <p>{title}</p>
        </div>
    )
}

export default Album