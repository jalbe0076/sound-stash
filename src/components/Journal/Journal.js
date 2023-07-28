import './Journal.css';
import Entry from '../Entry/Entry'

const Journal = ({currentUser, setCurrentUser}) => {

  return (
    <div className='journal'>
    {currentUser.journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} setCurrentUser={setCurrentUser} {...entry}/>)}
    </div>
  )
};

export default Journal;