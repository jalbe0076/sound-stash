import './Journal.css';
import Entry from '../Entry/Entry'

const Journal = ({user, setUser}) => {

  return (
    <div className='journal'>
    {user.journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} setUser={setUser} {...entry}/>)}
    </div>
  )
};

export default Journal;