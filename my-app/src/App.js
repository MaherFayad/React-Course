import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookingpage from './Pages/Bookingpage';
import ConfirmedBooking from './Pages/ConfirmedBooking ';
import './App.css';


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Bookingpage />} />
          <Route path="Confirmed" element={<ConfirmedBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
