const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/Authentication');
const { newEvent, RsvpForEvent, allEvents, OneEvent, UpdateEvent, DeleteEvent } = require("../controllers/EventControllers");

// Create a new event
router.post('/create', authMiddleware, newEvent);

// RSVP for an event
router.post('/:id/rsvp', authMiddleware, RsvpForEvent);

// Get all events
router.get('/', allEvents);

// Get event by ID
router.get('/:id', OneEvent);

// Update event by ID
router.put('/:id', UpdateEvent);

// Delete event by ID
router.delete('/:id', DeleteEvent);

module.exports = router;
