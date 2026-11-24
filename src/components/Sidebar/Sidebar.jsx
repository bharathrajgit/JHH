import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMinPrice,
  setMaxPrice,
  setLocationFilter,
  setMinRating,
  applyFilters,
  clearFilters
} from '../../redux/store';
import './Sidebar.css';

function Sidebar() {
  const dispatch = useDispatch();
  const { hotels, minPrice, maxPrice, locationFilter, minRating } = useSelector((state) => state.hotels);

  const locations = Array.from(new Set(hotels.map((hotel) => hotel.location).filter(Boolean))).sort();

  function handleApply() {
    dispatch(applyFilters());
  }

  function handleClear() {
    dispatch(clearFilters());
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>Filters</h2>

        <div className="filter-group">
          <label htmlFor="location-filter">Location</label>
          <select
            id="location-filter"
            value={locationFilter}
            onChange={(event) => dispatch(setLocationFilter(event.target.value))}
          >
            <option value="all">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="rating-filter">Minimum rating</label>
          <select
            id="rating-filter"
            value={minRating}
            onChange={(event) => dispatch(setMinRating(event.target.value))}
          >
            <option value="all">Any rating</option>
            <option value="4.5">4.5+ stars</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
          </select>
        </div>

        <h3 className="sidebar-subheading">Price (per night)</h3>
        <div className="price-inputs">
          <div className="filter-group">
            <label htmlFor="min-price">Min (₹)</label>
            <input
              id="min-price"
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => dispatch(setMinPrice(event.target.value))}
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="max-price">Max (₹)</label>
            <input
              id="max-price"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => dispatch(setMaxPrice(event.target.value))}
              placeholder="15000"
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" className="btn-primary" onClick={handleApply}>APPLY</button>
          <button type="button" className="btn-secondary" onClick={handleClear}>Clear filters</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
