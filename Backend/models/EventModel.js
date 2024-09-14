const mongoose=require('mongoose')
const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    attendees: [{
        name: { type: String },
        email: { type: String, match: /.+\@.+\..+/ } // Validate email format
    }],
    reminderSent: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Event', EventSchema);
