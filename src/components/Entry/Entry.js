import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating'
import'./Entry.css'
import UserContext from '../UserContext/UserContext'
import { toast } from 'react-toastify';

const notifyDelete = () => toast('Journal Entry Deleted!')

function Entry ({id, title, artists, date, notes, image, rating, masterId}) {
  const {setCurrentUser} = useContext(UserContext);
  const [notesHidden, setNotesHidden] = useState(true)
  const [notesIcon, setIcon] = useState('/images/sticky-note-white.png')
  const navigate = useNavigate()

  const showNotes = () => {
    notesHidden ? setNotesHidden(false) : setNotesHidden(true)
    notesIcon === '/images/sticky-note-white.png' ? setIcon('/images/sticky-note-pink.png') : setIcon('/images/sticky-note-white.png')
  }

  const handleDelete = (event) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      journal: prevUser.journal.filter(entry => entry.id !== parseInt(event.target.id))
    }))
    notifyDelete();
  }

  return (
    <article className='journal-entry'>
      <p className='entry-date'>{date}</p>
      <div className='entry'>
        <div className='entry-info'>
        <img className='entry-image' src={image} alt={`${title} by ${artists}`} onClick={()=> navigate(`../albums/${masterId}`)}/>
        <div className='entry-details'>
          <p className='entry-title'>{title}</p>
          <p className='entry-artist'>{artists}</p>
          {rating>0 && <Rating className='rating' initialValue={rating} readonly={true} allowFraction={true} size='20'/>}
        </div>
        </div>
        <div className='journal-actions'>
          {!notes ? null : <img className={`notes-icon ${notesHidden ? "" : "active-note"}`} src={notesIcon} alt='notes-icon' onClick={showNotes}/>}
          <img id={id} className='entry-delete' src={process.env.PUBLIC_URL + "/images/trash.png"} alt='trash-can-icon' onClick={handleDelete}/>
        </div>
      </div>
      {!notesHidden && <p className='entry-notes'>{notes}</p>}
    </article>
  )
}

Entry.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  notes: PropTypes.string,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  masterId: PropTypes.number.isRequired,
};

export default Entry
