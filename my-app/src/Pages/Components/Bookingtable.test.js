// bookingtable.js (or the name of your file)
import { initializeTimes, updateTimes } from './Bookingtable'; // Import the functions to be tested

describe('initializeTimes', () => {
  it('should return the initial state for availableTimes', () => {
    const initialState = initializeTimes();
    // Replace this with your actual initial state value
    const expectedState = [];

    expect(initialState).toEqual(expectedState);
  });
});

describe('updateTimes', () => {
  it('should return the same state value provided in the action', () => {
    const initialState = [{ time: '17:00' }];
    const action = { type: 'UPDATE_TIMES', payload: 'newDate' };

    // The initial state should not be modified by the reducer
    const updatedState = updateTimes(initialState, action);

    expect(updatedState).toEqual(initialState);
  });

  // Add more tests when you implement the logic for changing times based on the date
});
