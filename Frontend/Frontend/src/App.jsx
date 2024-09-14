import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventCreate from './components/EventForm';
import EventDetails from './components/EventDetails';
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/events" element={<EventList />} />
        <Route path="/events/create" element={<EventCreate />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
