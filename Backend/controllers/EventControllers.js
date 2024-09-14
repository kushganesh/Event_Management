const Event = require("../models/EventModel");
const sendEmail = require('../utils/EmailSender');
const ActivityLog = require('../models/UserActivityLog'); 

// Utility function to log activities
const logActivity = async (userId, action, details) => {
    try {
        await new ActivityLog({ userId, action, details }).save();
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

const newEvent = async (req, res) => {
    const { name, description, date, location } = req.body;
    const userId = req.user.id; // Ensure this is available
    try {
        const newEvent = new Event({ name, description, date, location });
        await newEvent.save();
        await logActivity(userId, 'Event Created', `Event "${name}" created.`);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const RsvpForEvent = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const userId = req.user.id;
    try {
        const event = await Event.findById(id);
        event.attendees.push({ name, email });
        await event.save();
        await logActivity(userId, 'RSVP', `RSVP'd to event "${event.name}".`);
        res.status(200).json(event);

        // Send email confirmation
        sendEmail(email, `RSVP Confirmed for ${event.name}`, `You have successfully RSVP'd for the event!`);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all events
const allEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const OneEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Send Reminder Emails
const cron = require('node-cron');
cron.schedule('0 8 * * *', async () => {
    const events = await Event.find({ reminderSent: false });
    events.forEach(async (event) => {
        const today = new Date();
        if (event.date.getTime() - today.getTime() < 24 * 60 * 60 * 1000) {
            event.attendees.forEach((attendee) => {
                sendEmail(attendee.email, `Reminder for ${event.name}`, `Event ${event.name} is happening tomorrow at ${event.location}.`);
            });
            event.reminderSent = true;
            await event.save();
        }
    });
});

const UpdateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { name, description, date, location }, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const DeleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { newEvent, allEvents, RsvpForEvent, OneEvent, UpdateEvent, DeleteEvent };
