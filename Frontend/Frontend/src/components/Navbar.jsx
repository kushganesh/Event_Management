import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Internal CSS
  const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '10px 20px',
    },
    ul: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-around',
    },
    li: {
      margin: 0,
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#ddd',
    },
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/events" style={styles.link} 
          onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
        >Events</Link></li>
        <li style={styles.li}><Link to="/events/create" style={styles.link} 
          onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
        >Create Event</Link></li>
        <li style={styles.li}><Link to="/login" style={styles.link} 
          onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
        >Login</Link></li>
        <li style={styles.li}><Link to="/register" style={styles.link} 
          onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
        >Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
