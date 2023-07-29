import './Nav.css';
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';
import { useContext } from 'react';

const Nav = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/');
    setCurrentUser(false);
  }
  
  return (
    <section className='banner-container'>
      <Link to='/' className='title' ><h1>SOUND STASH</h1></Link>
      {currentUser && 
      <nav className='navigation-tabs'>
        <NavLink to="/collections" className='nav'>COLLECTIONS</NavLink>
        <NavLink to="/journal" className='nav'>JOURNAL</NavLink>
        <NavLink to="/discover" className='nav'>DISCOVER</NavLink>
      </nav>}
      {currentUser ? 
          <button className='logout-btn' onClick={() => logoutUser()}><img className='user-profile user-icon' src={process.env.PUBLIC_URL + '/images/user-icon.png'}/>LOGOUT</button> 
        : <button className='user-profile standard-btn' onClick={() => navigate('/login')}>LOGIN</button>
      }
    </section>
  );
};

export default Nav;
