import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Bookingtable from './Bookingtable';

// Mock the fetchAPI and submitAPI functions
jest.mock('./API', () => ({
  fetchAPI: async (date) => {
    // Mock the behavior of fetchAPI
    if (date === 'valid-date') {
      return ['time1', 'time2'];
    } else {
      throw new Error('Invalid date');
    }
  },
  submitAPI: async (formData) => {
    // Mock the behavior of submitAPI
    if (formData.date === 'valid-date' && formData.numberOfGuests >= 1 && formData.numberOfGuests <= 10) {
      return true;
    } else {
      return false;
    }
  },
}));

describe('Bookingtable', () => {
  it('renders Bookingtable component', () => {
    render(<Bookingtable availableTimes={[]} dispatch={() => {}} bookingDataState={[]} />);
    expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
    expect(screen.getByText('Make Your reservation')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<Bookingtable availableTimes={[]} dispatch={() => {}} bookingDataState={[]} />);
    const dateInput = screen.getByLabelText('Choose date');
    const timeInput = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const submitButton = screen.getByText('Make Your reservation');

    fireEvent.change(dateInput, { target: { value: 'valid-date' } });
    fireEvent.change(timeInput, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });

    fireEvent.click(submitButton);

    // Add your assertions for the success path here
    // Verify that the form submission was successful
  });

  it('displays an error with invalid data', async () => {
    render(<Bookingtable availableTimes={[]} dispatch={() => {}} bookingDataState={[]} />);
    const dateInput = screen.getByLabelText('Choose date');
    const timeInput = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const submitButton = screen.getByText('Make Your reservation');

    fireEvent.change(dateInput, { target: { value: 'invalid-date' } });
    fireEvent.change(timeInput, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '11' } });

    fireEvent.click(submitButton);

    // Add your assertions for the error path here
    // Verify that the form submission failed and an error message is displayed
  });
});
