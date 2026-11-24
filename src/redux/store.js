import { configureStore, createSlice } from '@reduxjs/toolkit';
import { sampleHotels } from '../data/hotels';

const STORAGE_KEY = 'hotelListings';

function isValidHotelData(hotels) {
  return Array.isArray(hotels) && hotels.every((hotel) => (
    hotel &&
    typeof hotel.title === 'string' &&
    typeof hotel.location === 'string' &&
    typeof hotel.rating !== 'undefined'
  ));
}

function loadHotels() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (isValidHotelData(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    // If saved data is invalid, fall back to sample data.
  }
  return sampleHotels;
}

const initialState = {
  hotels: loadHotels(),
  searchTerm: '',
  minPrice: '',
  maxPrice: '',
  locationFilter: 'all',
  minRating: 'all',
  appliedMinPrice: '',
  appliedMaxPrice: '',
  appliedLocationFilter: 'all',
  appliedMinRating: 'all',
  currentPage: 1,
  notification: ''
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel(state, action) {
      state.hotels.unshift(action.payload);
      state.notification = '';
      state.currentPage = 1;
    },
    updateHotel(state, action) {
      const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id);
      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
    },
    deleteHotel(state, action) {
      state.hotels = state.hotels.filter((hotel) => hotel.id !== action.payload);
      state.notification = 'Hotel deleted successfully.';
      state.currentPage = 1;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setLocationFilter(state, action) {
      state.locationFilter = action.payload;
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    applyFilters(state) {
      state.appliedMinPrice = state.minPrice;
      state.appliedMaxPrice = state.maxPrice;
      state.appliedLocationFilter = state.locationFilter;
      state.appliedMinRating = state.minRating;
      state.currentPage = 1;
    },
    clearFilters(state) {
      state.minPrice = '';
      state.maxPrice = '';
      state.locationFilter = 'all';
      state.minRating = 'all';
      state.appliedMinPrice = '';
      state.appliedMaxPrice = '';
      state.appliedLocationFilter = 'all';
      state.appliedMinRating = 'all';
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    clearNotification(state) {
      state.notification = '';
    }
  }
});

export const {
  addHotel,
  updateHotel,
  deleteHotel,
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
  setLocationFilter,
  setMinRating,
  applyFilters,
  clearFilters,
  setCurrentPage,
  clearNotification
} = hotelSlice.actions;

export const store = configureStore({
  reducer: {
    hotels: hotelSlice.reducer
  }
});

store.subscribe(() => {
  try {
    const { hotels } = store.getState().hotels;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
  } catch (error) {
    // Ignore storage errors so the app still works.
  }
});

export default store;
