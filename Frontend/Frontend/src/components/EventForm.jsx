import React, { useState } from 'react';
import { createEvent } from '../services/api';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(formData);
    alert('Event created successfully');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Internal CSS
  const styles = {
    form: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    button: {
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Event Name"
        style={styles.input}
      />
      <input
        name="description"
        onChange={handleChange}
        placeholder="Description"
        style={styles.input}
      />
      <input
        type="date"
        name="date"
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="location"
        onChange={handleChange}
        placeholder="Location"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Create Event</button>
    </form>
  );
};

export default EventForm;
