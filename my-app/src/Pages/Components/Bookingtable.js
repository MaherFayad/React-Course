import React, { useReducer, useState, useEffect, fetchAPI } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


function Bookingtable({ availableTimes, dispatch, bookingData }) {
    const [bookingData, setBookingData] = useState([]);
    const updateTimes = (state, action) => {
        switch (action.type) {
        case 'UPDATE_TIMES':
          return action.availableTimes;
        default:
          return state;
      }
    };
  
    const initializeTimes = () => {
      return [];
    };
  
    const [timesState, dispatch] = useReducer(updateTimes, [], initializeTimes);
    const [selectedDate, setSelectedDate] = useState('');
  
    useEffect(() => {
      async function fetchAvailableTimes() {
        try {
          const response = await fetchAPI(selectedDate);
          dispatch({ type: 'UPDATE_TIMES', availableTimes: response });
        } catch (error) {
          console.error('Error fetching available times:', error);
        }
      }
  
      if (selectedDate) {
        fetchAvailableTimes();
      }
    }, [selectedDate]);
  
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const navigate = useNavigate(); 

  const getIsFormValid = () => {
    // Implement validation logic if needed
    return true; // You can add validation here
  };

  const clearForm = () => {
    setResDate('');
    setResTime('17:00');
    setGuests(1);
    setOccasion('Birthday');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the form submission logic here
    // For example:
    // eslint-disable-next-line no-undef
    const isSubmitted = await submitAPI(formData);
    if (isSubmitted) {
        navigate('/confirmed'); // Navigate to the booking confirmation page
      }

    alert('Reservation created!');
    clearForm();
  };

  return (
    <React.Fragment>
      <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit}>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={resDate}
          onChange={(e) => setResDate(e.target.value)}
          aria-label="Choose date"
        />

        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={resTime}
          onChange={(e) => setResTime(e.target.value)}
          aria-label="Choose time"
        >
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          aria-label="Number of guests"
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          aria-label="Occasion"
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <input
          type="submit"
          value="Make Your reservation"
          disabled={!getIsFormValid()}
          aria-label="Submit reservation"
        />
      </form>
    </React.Fragment>
  );
}

export default Bookingtable;
