import './Journal.css';
import Entry from '../Entry/Entry'

const Journal = ({user}) => {

  return (
    <div className='journal'>
    {user.journal.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => <Entry key={entry.id} {...entry}/>)}
    </div>
  )
};

export default Journal;