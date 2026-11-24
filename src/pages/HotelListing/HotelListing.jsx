import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import HotelList from '../../components/HotelList/HotelList';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import { deleteHotel, setCurrentPage, clearNotification } from '../../redux/store';
import './HotelListing.css';

const HOTELS_PER_PAGE = 5;

function HotelListing() {
  const dispatch = useDispatch();
  const {
    hotels,
    searchTerm,
    appliedMinPrice,
    appliedMaxPrice,
    appliedLocationFilter,
    appliedMinRating,
    currentPage,
    notification
  } = useSelector((state) => state.hotels);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [notification, dispatch]);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title.toLowerCase().includes(searchTerm.toLowerCase().trim());

    const min = appliedMinPrice === '' ? null : Number(appliedMinPrice);
    const max = appliedMaxPrice === '' ? null : Number(appliedMaxPrice);
    const price = Number(hotel.price);
    const matchesMin = min === null || Number.isNaN(min) ? true : price >= min;
    const matchesMax = max === null || Number.isNaN(max) ? true : price <= max;

    const matchesLocation = appliedLocationFilter === 'all' || hotel.location === appliedLocationFilter;

    const ratingLimit = appliedMinRating === 'all' ? null : Number(appliedMinRating);
    const hotelRating = Number(hotel.rating || 0);
    const matchesRating = ratingLimit === null || Number.isNaN(ratingLimit) ? true : hotelRating >= ratingLimit;

    return matchesSearch && matchesMin && matchesMax && matchesLocation && matchesRating;
  });

  const totalPages = Math.ceil(filteredHotels.length / HOTELS_PER_PAGE) || 1;
  const safeCurrentPage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (safeCurrentPage - 1) * HOTELS_PER_PAGE;
  const currentHotels = filteredHotels.slice(startIndex, startIndex + HOTELS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  function handleDelete(id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this hotel?');
    if (shouldDelete) {
      dispatch(deleteHotel(id));
    }
  }

  function handlePageChange(page) {
    dispatch(setCurrentPage(page));
  }

  return (
    <div className="hotel-listing-page">
      <Helmet>
        <title>Hotels | Hotel Listing Management</title>
        <meta name="description" content="Browse, search, filter, edit, and delete hotel listings." />
      </Helmet>

      <Header />

      <main className="page-content">
        <div className="container main-layout">
          <Sidebar />

          <section className="content-panel">
            <div className="list-toolbar">
              <span><strong>{filteredHotels.length} Hotels found</strong></span>
              <span className="toolbar-right">Page {safeCurrentPage} of {totalPages}</span>
            </div>

            {notification && <div className="notification">{notification}</div>}

            <HotelList hotels={currentHotels} onDelete={handleDelete} />

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HotelListing;
