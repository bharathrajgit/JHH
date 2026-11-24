import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HotelForm from '../../components/HotelForm/HotelForm';
import { addHotel, updateHotel } from '../../redux/store';
import './AddEditHotel.css';

function AddEditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels);

  const isEdit = Boolean(id);
  const existingHotel = isEdit ? hotels.find((hotel) => hotel.id === id) : null;

  function handleSubmit(hotelData) {
    if (isEdit) {
      dispatch(updateHotel({ ...hotelData, id }));
    } else {
      const newHotel = { ...hotelData, id: `hotel-${Date.now()}` };
      dispatch(addHotel(newHotel));
    }
    navigate('/');
  }

  if (isEdit && !existingHotel) {
    return (
      <div className="add-edit-page">
        <Helmet>
          <title>Hotel Not Found | JHH</title>
        </Helmet>
        <Header />
        <main className="page-content">
          <div className="container form-page">
            <div className="error-state">
              <p>Hotel not found.</p>
              <Link to="/" className="btn-secondary">Back to Listings</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = isEdit ? 'Edit Hotel' : 'Add Hotel';

  return (
    <div className="add-edit-page">
      <Helmet>
        <title>{pageTitle} | JHH</title>
        <meta name="description" content={`${pageTitle} details in the Jahir Hussian Hotel (JHH) listing application.`} />
      </Helmet>

      <Header />

      <main className="page-content">
        <div className="container form-page">
          <HotelForm
            initialData={isEdit ? existingHotel : null}
            onSubmit={handleSubmit}
            submitLabel={isEdit ? 'Update Hotel' : 'Add Hotel'}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddEditHotel;
