import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <NavLink to="/collections" className="nav">COLLECTIONS</NavLink>
      <NavLink to="/journal" className="nav">JOURNAL</NavLink>
      <NavLink to="/DISCOVER" className="nav">DISCOVER</NavLink>
    </nav>
  );
};

export default Nav;