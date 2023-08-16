import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import { Rating } from 'react-simple-star-rating'
import 'react-toastify/dist/ReactToastify.css';
import "flatpickr/dist/themes/dark.css"
import './Form.css'
import UserContext from '../UserContext/UserContext'
import { toast } from 'react-toastify';

function Form ({title, artist, coverImg, id, showModal}) {
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(currentDate)
  const [date, setDate] = useState(formattedDate)
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(0)

  const notifyAddedJournal = () => toast('Journal Entry Added!')
  
  const onImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"
  }

  const handleSubmit = (event) => {
    const newEntry = {
      masterId: id,
      id: Date.now(),
      title: title,
      artists: artist,
      image: coverImg,
      date: date,
      rating: rating,
      notes: notes
    }
    event.preventDefault()
    setCurrentUser(prev => ({
      ...prev,
      journal: [...prev.journal, newEntry]
    }))
    notifyAddedJournal();
    navigate('/journal');
  }

  return (
    <div className='main-form-container'>
      <form name='journal-form' className='journal-form'>
        <div className='form-container'>
          <img className='form-image' src={coverImg} alt={`${title} by ${artist}`} onError={onImageError}/>
          <div className='form-info'>
            <p><span className='form-title'>{title}</span></p>
            <p>{artist}</p>
            <p className='form-listen'>Listened</p>
            <div className='date-container'>
              <Flatpickr 
                name='date-input'
                className='date-input'
                value={date}
                options={
                  { altFormat: true,
                    dateFormat: "F j, Y",
                    maxDate: "today",
                    disableMobile: true,
                    onChange: function updateDate (selectedDates, dateStr) {
                      setDate(dateStr)
                    }
                  }}
                placeholder={formattedDate}/>
                <img className='calendar-icon'  src={process.env.PUBLIC_URL + "/images/calendar.png"} alt='calendar-icon'
              />
            </div>
          </div>
          <img className='form-escape' src={process.env.PUBLIC_URL + "/images/escape-white.png"} alt='escape-icon' onClick={showModal} tabIndex={1}/>
        </div>
        <Rating className='form-rating' value={rating} size='24' allowFraction={true} onClick={(rate) => setRating(rate)}/>
        <label className='form-notes-label' htmlFor='form-notes'>Listening Notes</label>
        <textarea 
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className='form-notes'
          name='notes'
          rows = "10"
          cols = "20"
          minLength="1"
          maxLength="1000"
          placeholder='Add some notes...'
          id='form-notes'>
        </textarea>
        <button name='journal-form' className='form-submit' type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default Form