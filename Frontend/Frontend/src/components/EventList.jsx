import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/api';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  // Internal CSS
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      fontSize: '1.1rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
    date: {
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Event List</h2>
      <ul style={styles.list}>
        {events.map(event => (
          <li key={event._id} style={styles.listItem}>
            <span>{event.name}</span>
            <span style={styles.date}>{new Date(event.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
