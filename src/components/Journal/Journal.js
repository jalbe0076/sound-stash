import './Journal.css';
import Entry from '../Entry/Entry'
import UserContext from '../UserContext/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const {currentUser, isUserLoggedIn} = useContext(UserContext)
  const { journal } = currentUser
  const navigate = useNavigate()

  useEffect(() => {
    !isUserLoggedIn && navigate('/')
  }, [])

  return (
    <div className='journal'>
      {journal.length ? journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} {...entry}/>)
      : <h2>No journal entries</h2>}
    </div>
  )
};

export default Journal;