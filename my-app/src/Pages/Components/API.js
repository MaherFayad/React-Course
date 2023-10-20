// api.js

// Function to fetch data from the API based on a date
export async function fetchAPI(date) {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  // Function to submit data to the API
  export async function submitAPI(formData) {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  