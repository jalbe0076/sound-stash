import './Nav.css';
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';
import { useContext } from 'react';

const Nav = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate()

  return (
    <section className='banner-container'>
      <Link to='/' className='title' ><h1>SOUND STASH</h1></Link>
      {currentUser && 
      <nav className='navigation-tabs'>
        <NavLink to="/collections" className='nav'>COLLECTIONS</NavLink>
        <NavLink to="/journal" className='nav'>JOURNAL</NavLink>
        <NavLink to="/discover" className='nav'>DISCOVER</NavLink>
      </nav>}
      {!currentUser && <button className='user-profile standard-btn' onClick={() => navigate('/login')}>LOGIN</button>}
    </section>
  );
};

export default Nav;
