require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const eventRoutes = require('./routers/EventRouter');
const userRoutes = require('./routers/UserRouter');


// Initialize app
const app = express();

app.use(cors({ origin: 'http://localhost:5000' }));
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const DbConnection = require("./utils/DbConnections");
DbConnection();

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
