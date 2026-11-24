import React from 'react';
import { Link } from 'react-router-dom';
import './HotelItem.css';

function formatPrice(price) {
  return `₹${Number(price).toLocaleString('en-IN')}`;
}

function HotelItem({ hotel, onDelete }) {
  return (
    <div className="hotel-item">
      <div className="hotel-image">
        <img src={hotel.image} alt={hotel.title} />
      </div>

      <div className="hotel-info">
        <h3><Link to={`/hotels/${hotel.id}`}>{hotel.title}</Link></h3>
        <p className="hotel-meta-line"><strong>Location:</strong> {hotel.location || 'N/A'} &nbsp;|&nbsp; <strong>Rating:</strong> {hotel.rating || 'N/A'} / 5</p>
        <p>{hotel.description}</p>
        <p className="hotel-location">
          Latitude: {hotel.latitude} &nbsp;|&nbsp; Longitude: {hotel.longitude}
        </p>
      </div>

      <div className="hotel-actions">
        <div className="hotel-price">{formatPrice(hotel.price)} <span>/ night</span></div>
        <Link to={`/hotels/${hotel.id}`} className="btn-primary">View Details</Link>
        <Link to={`/hotels/${hotel.id}/edit`} className="btn-secondary">Edit</Link>
        <button type="button" className="btn-danger" onClick={() => onDelete(hotel.id)}>Delete</button>
      </div>
    </div>
  );
}

export default HotelItem;
