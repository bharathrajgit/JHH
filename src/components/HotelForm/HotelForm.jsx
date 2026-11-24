import React, { useEffect, useState } from 'react';
import './HotelForm.css';

function HotelForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rating: '',
    description: '',
    latitude: '',
    longitude: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        location: initialData.location || '',
        rating: initialData.rating?.toString() ?? '',
        description: initialData.description || '',
        latitude: initialData.latitude?.toString() ?? '',
        longitude: initialData.longitude?.toString() ?? '',
        price: initialData.price?.toString() ?? '',
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Hotel title is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    const rating = Number(formData.rating);
    if (formData.rating === '' || Number.isNaN(rating)) {
      newErrors.rating = 'Rating must be a valid number.';
    } else if (rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Hotel description is required.';
    }

    if (!formData.image) {
      newErrors.image = 'Please upload a hotel image.';
    }

    const lat = Number(formData.latitude);
    if (formData.latitude === '' || Number.isNaN(lat)) {
      newErrors.latitude = 'Latitude must be a valid number.';
    } else if (lat < -90 || lat > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90.';
    }

    const lng = Number(formData.longitude);
    if (formData.longitude === '' || Number.isNaN(lng)) {
      newErrors.longitude = 'Longitude must be a valid number.';
    } else if (lng < -180 || lng > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180.';
    }

    const price = Number(formData.price);
    if (formData.price === '' || Number.isNaN(price)) {
      newErrors.price = 'Price must be a valid number.';
    } else if (price <= 0) {
      newErrors.price = 'Price must be greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const hotelData = {
      title: formData.title.trim(),
      location: formData.location.trim(),
      rating: Number(formData.rating),
      description: formData.description.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
      image: formData.image
    };

    if (initialData && initialData.id) {
      hotelData.id = initialData.id;
    }

    onSubmit(hotelData);
  }

  return (
    <form onSubmit={handleSubmit} className="card hotel-form">
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="title">Hotel title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error-text">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location (city)</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
          />
          {errors.location && <div className="error-text">{errors.location}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1 to 5)</label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="4.5"
          />
          {errors.rating && <div className="error-text">{errors.rating}</div>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Hotel description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <div className="error-text">{errors.description}</div>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="image">Hotel image upload</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.image && <div className="error-text">{errors.image}</div>}
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Hotel preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
          />
          {errors.latitude && <div className="error-text">{errors.latitude}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
          />
          {errors.longitude && <div className="error-text">{errors.longitude}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price per night (₹)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="error-text">{errors.price}</div>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}

export default HotelForm;
