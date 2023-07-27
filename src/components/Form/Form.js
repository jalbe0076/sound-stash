import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import { Rating } from 'react-simple-star-rating'
import "flatpickr/dist/themes/dark.css"
import './Form.css'
// import calendar from '../../../public/images/calendar.png'


function Form ({title, artists, images, setUser}) {
  const navigate = useNavigate()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(currentDate)
  const [date, setDate] = useState(formattedDate)
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(0)
  
  const handleSubmit = (event) => {
    const newEntry = {
      id: Date.now(),
      title: title,
      artists: artists.map(artist => artist.name).join(' / '),
      image: images ? images[0].uri : process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png",
      date: date,
      rating: rating,
      notes: notes
    }
    event.preventDefault()
    setUser(prev => ({
      ...prev,
      journal: [...prev.journal, newEntry]
    }))
    navigate('/journal')
  }

  return (
    <form name='journal-form' className='journal-form'>
      <div className='form-container'>
        <img className='form-image' src={images ? images[0].uri : process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"}/>
        <div>
          <p><span className='form-title'>{title}</span>  {artists.map(artist => artist.name).join(' / ')}</p>
          <p className='form-listen'>Listened</p>
          <div className='date-container'>
            <Flatpickr 
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
            <img className='calendar-icon' src={process.env.PUBLIC_URL + "/images/calendar.png"}/>
          </div>
        </div>
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
      <button className='form-submit' type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Form