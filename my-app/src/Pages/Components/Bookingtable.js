import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI } from './API';
import '../../App.css';


function Bookingtable({ availableTimes, dispatch, bookingDataState }) {
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const navigate = useNavigate();

  const isDateValid = (date) => {
    return date.trim() !== '';
  };

  const isGuestsValid = (guests) => {
    return guests >= 1 && guests <= 10;
  };

  const getIsFormValid = () => {
    const isDateFieldValid = isDateValid(resDate);
    const isGuestsFieldValid = isGuestsValid(guests);
    return isDateFieldValid && isGuestsFieldValid;
  };

  const clearForm = () => {
    setResDate('');
    setResTime('17:00');
    setGuests(1);
    setOccasion('Birthday');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      date: resDate,
      time: resTime,
      numberOfGuests: guests,
      occasion,
    };

    try {
      const isSubmitted = await submitAPI(formData);

      if (isSubmitted) {
        navigate('/confirmed');
        alert('Reservation created!');
        clearForm();
      } else {
        alert('Reservation submission failed.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Reservation submission failed.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Make a Reservation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="res-date" className="text-sm text-gray-600 font-semibold">Choose Date</label>
            <input
              type="date"
              id="res-date"
              value={resDate}
              onChange={(e) => setResDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="res-time" className="text-sm text-gray-600 font-semibold">Choose Time</label>
            <select
              id="res-time"
              value={resTime}
              onChange={(e) => setResTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
            </select>
          </div>
          <div>
            <label htmlFor="guests" className="text-sm text-gray-600 font-semibold">Number of Guests</label>
            <input
              type="number"
              placeholder="1"
              min="1"
              max="10"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="occasion" className="text-sm text-gray-600 font-semibold">Occasion</label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={!getIsFormValid()}
              className="w-full bg-indigo-600 text-white rounded-md font-semibold py-2 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              Make Your Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Bookingtable;
