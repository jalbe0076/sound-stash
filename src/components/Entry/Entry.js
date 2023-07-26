import React, {useState} from 'react'
import { Rating } from 'react-simple-star-rating'
import'./Entry.css'

function Entry ({id, title, artists, date, notes, image, rating}) {
  const [notesHidden, setNotesHidden] = useState(true)
  
  const showNotes = () => {
    notesHidden ? setNotesHidden(false) : setNotesHidden(true)
  }

  return (
    <>
      <p className='entry-date'>{date}</p>
      <div className='entry'>
        {/* <div className='entry-date-container'>
        </div> */}
        <img className='entry-image' src={image}/>
        <div className='entry-info'>
          <p className='entry-title'>{title}</p>
          <p className='entry-artist'>{artists}</p>
          {rating>0 && <Rating initialValue={rating} readonly={true} size='12'/>}
        </div>
        {!notes ? null : <button onClick={showNotes}>show</button>}
        <button className='entry-delete'>DELETE</button>
      </div>
      {!notesHidden && <p className='entry-notes'>{notes}</p>}
    </>
    )
}

export default Entry