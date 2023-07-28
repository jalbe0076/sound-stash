import './Journal.css';
import Entry from '../Entry/Entry'
import UserContext from '../UserContext/UserContext';
import { useContext } from 'react';

const Journal = () => {
  const {currentUser} = useContext(UserContext)

  return (
    <div className='journal'>
    {currentUser.journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} {...entry}/>)}
    </div>
  )
};

export default Journal;