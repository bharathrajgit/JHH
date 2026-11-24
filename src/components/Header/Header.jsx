import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/store';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = useSelector((state) => state.hotels.searchTerm);

  function handleSearchChange(event) {
    dispatch(setSearchTerm(event.target.value));
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">HS</span>
          <span className="logo-text">HotelStay</span>
        </Link>
        <div className='search-container'>
           <form className="search-bar" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search hotels by title..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search hotels by title"
              />
              <button type="submit">Search</button>
            </form>

            <Link to="/hotels/add" className="add-hotel-btn">+ Add Hotel</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;





