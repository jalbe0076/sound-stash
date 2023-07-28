import './Nav.css';
import { NavLink, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <section className='banner-container'>
      <Link to='/' className='title' ><h1>SOUND STASH</h1></Link>
      <nav className='navigation-tabs'>
        <NavLink to="/collections" className='nav'>COLLECTIONS</NavLink>
        <NavLink to="/journal" className='nav'>JOURNAL</NavLink>
        <NavLink to="/discover" className='nav'>DISCOVER</NavLink>
      </nav>
      <p className='user-profile'>User</p>
    </section>
  );
};

export default Nav;
