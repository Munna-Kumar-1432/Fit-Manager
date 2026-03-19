const pool = require('../config/db');

exports.getAllPayments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addPayment = async (req, res) => {
    try {
        const { invoice, member, plan, amount, date, method, methodIcon, status, statusClass } = req.body;
        const insertQuery = `
            INSERT INTO payments (invoice, member, plan, amount, date, method, methodIcon, status, statusClass)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [invoice, member, plan, amount, date, method, methodIcon, status, statusClass];
        const newPayment = await pool.query(insertQuery, values);
        res.status(201).json(newPayment.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
