import './Nav.css';
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../UserContext/UserContext';
import { useContext } from 'react';
import PaletteSelect from '../PaletteSelect/PaletteSelect';

const Nav = ({ theme, setTheme }) => {
  const {setCurrentUser, isUserLoggedIn, setIsUserLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/');
    setCurrentUser(false);
    setIsUserLoggedIn(false)
  }

  return (
    <section className='banner-container' data-theme={theme}>
      <Link to='/' className='title' ><h1>SOUND STASH</h1></Link>
      {isUserLoggedIn && 
      <nav className='navigation-tabs'>
        <NavLink to="/collections" className='nav'>COLLECTIONS</NavLink>
        <NavLink to="/journal" className='nav'>JOURNAL</NavLink>
        <NavLink to="/discover" className='nav'>DISCOVER</NavLink>
      </nav>}
      {isUserLoggedIn ? 
          <button className='logout-btn' onClick={() => logoutUser()}><img className='user-profile user-icon' src={process.env.PUBLIC_URL + '/images/user-icon.png'}/>LOGOUT</button> 
        : <button className='user-profile standard-btn' onClick={() => navigate('/login')}>LOGIN</button>
      }
      <PaletteSelect setTheme={setTheme}/>
    </section>
  );
};

export default Nav;
