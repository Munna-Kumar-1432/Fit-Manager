const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: String, required: true, enum: ['Basic', 'Premium', 'Elite'] },
    joined: { type: String, required: true },
    expires: { type: String, required: true },
    status: { type: String, required: true, enum: ['Active', 'Pending', 'Expired'] },
    statusClass: { type: String, required: true },
    photoUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
