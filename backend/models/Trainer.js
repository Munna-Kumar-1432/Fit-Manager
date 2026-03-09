const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, required: true },
    emoji: { type: String, required: true },
    clients: { type: Number, default: 0 },
    sessions: { type: Number, default: 0 },
    reviews: { type: Number, default: 5.0 },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);
