import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpData, setRsvpData] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleRSVP = async () => {
    try {
      await axios.post(`/api/events/${id}/rsvp`, rsvpData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('RSVP successful!');
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      color: '#4a90e2'
    },
    paragraph: {
      fontSize: '1.125rem',
      margin: '10px 0'
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem'
    },
    button: {
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '1rem',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    loading: {
      fontSize: '1.25rem',
      color: '#888'
    }
  };

  return (
    <div style={styles.container}>
      {event ? (
        <>
          <h1 style={styles.heading}>{event.name}</h1>
          <p style={styles.paragraph}>{event.description}</p>
          <p style={styles.paragraph}>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p style={styles.paragraph}>Location: {event.location}</p>

          <h3 style={styles.heading}>RSVP to this event</h3>
          <input
            style={styles.input}
            name="name"
            placeholder="Your Name"
            value={rsvpData.name}
            onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
          />
          <input
            style={styles.input}
            name="email"
            placeholder="Your Email"
            value={rsvpData.email}
            onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
          />
          <button style={styles.button} onClick={handleRSVP}>RSVP</button>
        </>
      ) : <p style={styles.loading}>Loading...</p>}
    </div>
  );
};

export default EventDetails;
