import './Journal.css';
import Entry from '../Entry/Entry'
import UserContext from '../UserContext/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Journal = () => {
  const {currentUser, isUserLoggedIn} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    !isUserLoggedIn && navigate('/')
  }, [])

  return (
    <div className='journal'>
      {currentUser.journal.length ?
      currentUser.journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} {...entry}/>)
      : <p className='no-entries'>Search an album to add to your journal</p>}
    </div>
  )

};

Journal.propTypes = {
  currentUser: PropTypes.shape({
    journal: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      artists: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      masterId: PropTypes.number.isRequired,
    })).isRequired,
  })
};


export default Journal;