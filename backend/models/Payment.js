const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoice: { type: String, required: true, unique: true },
    member: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: String, required: true },
    method: { type: String, required: true },
    methodIcon: { type: String, default: 'fas fa-money-bill' },
    status: { type: String, required: true, enum: ['Paid', 'Pending', 'Failed'] },
    statusClass: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
