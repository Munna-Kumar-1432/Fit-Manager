const pool = require('../config/db');

exports.getAllTrainers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM trainers ORDER BY created_at ASC');
        if (result.rows.length === 0) {
            return res.json([
                { name: 'Arjun Singh', specialty: 'Strength & Power', experience: '8 yrs', emoji: '💪', clients: 42, sessions: 380, reviews: 4.9, available: true },
                { name: 'Priya Sharma', specialty: 'Cardio & Zumba', experience: '5 yrs', emoji: '🏃', clients: 35, sessions: 290, reviews: 4.8, available: true },
                { name: 'Rahul Gupta', specialty: 'Yoga & Meditation', experience: '10 yrs', emoji: '🧘', clients: 28, sessions: 420, reviews: 5.0, available: false },
                { name: 'Neha Verma', specialty: 'Nutrition Coach', experience: '6 yrs', emoji: '🥗', clients: 50, sessions: 310, reviews: 4.7, available: true }
            ]);
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Trainers API Error (using fallbacks):', err.message);
        res.json([
            { name: 'Arjun Singh', specialty: 'Strength & Power', experience: '8 yrs', emoji: '💪', clients: 42, sessions: 380, reviews: 4.9, available: true },
            { name: 'Priya Sharma', specialty: 'Cardio & Zumba', experience: '5 yrs', emoji: '🏃', clients: 35, sessions: 290, reviews: 4.8, available: true },
            { name: 'Rahul Gupta', specialty: 'Yoga & Meditation', experience: '10 yrs', emoji: '🧘', clients: 28, sessions: 420, reviews: 5.0, available: false },
            { name: 'Neha Verma', specialty: 'Nutrition Coach', experience: '6 yrs', emoji: '🥗', clients: 50, sessions: 310, reviews: 4.7, available: true }
        ]);
    }
};

exports.addTrainer = async (req, res) => {
    try {
        const { name, specialty, experience, emoji, clients, sessions, reviews, available } = req.body;
        const insertQuery = `
            INSERT INTO trainers (name, specialty, experience, emoji, clients, sessions, reviews, available)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [name, specialty, experience, emoji, clients, sessions, reviews, available];
        const newTrainer = await pool.query(insertQuery, values);
        res.status(201).json(newTrainer.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
