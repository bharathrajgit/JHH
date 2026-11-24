import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HotelDetails.css';

function formatPrice(price) {
  return `₹${Number(price).toLocaleString('en-IN')}`;
}

function HotelDetails() {
  const { id } = useParams();
  const hotels = useSelector((state) => state.hotels.hotels);
  const hotel = hotels.find((item) => item.id === id);

  if (!hotel) {
    return (
      <div className="hotel-details-page">
        <Helmet>
          <title>Hotel Not Found | Hotel Listing Management</title>
        </Helmet>
        <Header />
        <main className="page-content">
          <div className="container details-page">
            <div className="error-state">
              <p>Hotel not found.</p>
              <Link to="/" className="btn-secondary">Back to Hotels</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.02}%2C${hotel.latitude - 0.02}%2C${hotel.longitude + 0.02}%2C${hotel.latitude + 0.02}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`;

  return (
    <div className="hotel-details-page">
      <Helmet>
        <title>{hotel.title} | Hotel Listing Management</title>
        <meta name="description" content={hotel.description} />
      </Helmet>

      <Header />

      <main className="page-content">
        <div className="container details-page">
          <Link to="/" className="back-link">&larr; Back to Hotels</Link>

          <div className="card">
            <div className="details-layout">
              <div className="details-image">
                <img src={hotel.image} alt={hotel.title} />
              </div>

              <div className="details-info">
                <h2>{hotel.title}</h2>
                <p className="details-meta"><strong>Price:</strong> {formatPrice(hotel.price)} per night</p>
                <p className="details-meta"><strong>Location:</strong> {hotel.location || 'N/A'}</p>
                <p className="details-meta"><strong>Rating:</strong> {hotel.rating || 'N/A'} / 5</p>
                <p>{hotel.description}</p>
                <p className="details-meta"><strong>Latitude:</strong> {hotel.latitude}</p>
                <p className="details-meta"><strong>Longitude:</strong> {hotel.longitude}</p>
              </div>
            </div>

            <div className="map-container">
              <iframe
                title={`Map location for ${hotel.title}`}
                src={mapSrc}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HotelDetails;
