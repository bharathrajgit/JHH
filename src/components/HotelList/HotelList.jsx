import React from 'react';
import HotelItem from '../HotelItem/HotelItem';
import './HotelList.css';

function HotelList({ hotels, onDelete }) {
  if (hotels.length === 0) {
    return <div className="empty-state">No hotels found. Try changing your search or filters.</div>;
  }

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <HotelItem key={hotel.id} hotel={hotel} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default HotelList;
