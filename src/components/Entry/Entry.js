import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import'./Entry.css'

function Entry ({setUser, id, title, artists, date, notes, image, rating, masterId}) {
  const [notesHidden, setNotesHidden] = useState(true)
  const [notesIcon, setIcon] = useState('/images/sticky-note-white.png')
  const navigate = useNavigate()

  const showNotes = () => {
    notesHidden ? setNotesHidden(false) : setNotesHidden(true)
    notesIcon === '/images/sticky-note-white.png' ? setIcon('/images/sticky-note-pink.png') : setIcon('/images/sticky-note-white.png')
  }

  const handleDelete = (event) => {
    setUser(prevUser => ({
      ...prevUser,
      journal: prevUser.journal.filter(entry => entry.id !== parseInt(event.target.id))
    }))
  }

  return (
    <>
      <p className='entry-date'>{date}</p>
      <div className='entry'>
        <img className='entry-image'src={image} alt={`${title} by ${artists}`} onClick={()=> navigate(`../albums/${masterId}`)}/>
        <div className='entry-info'>
          <p className='entry-title'>{title}</p>
          <p className='entry-artist'>{artists}</p>
          {rating>0 && <Rating initialValue={rating} readonly={true} size='12'/>}
        </div>
        {!notes ? null : <img className={`notes-icon`} src={notesIcon} alt='notes-icon' onClick={showNotes}/>}
        <img id={id} className='entry-delete' src={process.env.PUBLIC_URL + "/images/trash.png"} alt='trash-can-icon' onClick={handleDelete}/>
      </div>
      {!notesHidden && <p className='entry-notes'>{notes}</p>}
    </>
    )
}

export default Entry