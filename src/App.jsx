import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HotelListing from './pages/HotelListing/HotelListing';
import HotelDetails from './pages/HotelDetails/HotelDetails';
import AddEditHotel from './pages/AddEditHotel/AddEditHotel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HotelListing />} />
      <Route path="/hotels/add" element={<AddEditHotel />} />
      <Route path="/hotels/:id/edit" element={<AddEditHotel />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />
    </Routes>
  );
}

export default App;
