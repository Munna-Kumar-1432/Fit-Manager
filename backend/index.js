const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { clerkMiddleware, getAuth } = require('@clerk/express');
const pool = require('./config/db');

// Import routes
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Initialize PostgreSQL Tables and Seed Data
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS members (
                id VARCHAR(10) PRIMARY KEY,
                name VARCHAR(100),
                age INT,
                gender VARCHAR(20),
                phone VARCHAR(20),
                email VARCHAR(100),
                plan VARCHAR(50),
                photoUrl TEXT,
                joined VARCHAR(20),
                expires VARCHAR(20),
                status VARCHAR(20),
                statusClass VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS trainers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                specialty VARCHAR(100),
                experience VARCHAR(50),
                emoji VARCHAR(10),
                clients INT,
                sessions INT,
                reviews DECIMAL(2,1),
                available BOOLEAN,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                invoice VARCHAR(50) UNIQUE,
                member VARCHAR(100),
                plan VARCHAR(50),
                amount VARCHAR(20),
                date VARCHAR(50),
                method VARCHAR(50),
                methodIcon VARCHAR(50),
                status VARCHAR(20),
                statusClass VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS member_activities (
                id SERIAL PRIMARY KEY,
                member_id VARCHAR(50),
                activity_type VARCHAR(50),
                duration INT,
                calories INT,
                intensity VARCHAR(20),
                date DATE DEFAULT CURRENT_DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS member_metrics (
                id SERIAL PRIMARY KEY,
                member_id VARCHAR(50),
                weight DECIMAL(5,2),
                height DECIMAL(5,2),
                bmi DECIMAL(4,2),
                body_fat DECIMAL(4,2),
                date DATE DEFAULT CURRENT_DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Database tables verified/created successfully.');

        // Seed Trainers if empty
        const trainerCheck = await pool.query('SELECT COUNT(*) FROM trainers');
        if (parseInt(trainerCheck.rows[0].count) === 0) {
            console.log('Seeding initial trainers...');
            await pool.query(`
                INSERT INTO trainers (name, specialty, experience, emoji, clients, sessions, reviews, available) VALUES
                ('Arjun Singh', 'Strength & Power', '8 yrs', '💪', 42, 380, 4.9, true),
                ('Priya Sharma', 'Cardio & Zumba', '5 yrs', '🏃', 35, 290, 4.8, true),
                ('Rahul Gupta', 'Yoga & Meditation', '10 yrs', '🧘', 28, 420, 5.0, false),
                ('Neha Verma', 'Nutrition Coach', '6 yrs', '🥗', 50, 310, 4.7, true)
            `);
        }

        // Seed Payments if empty
        const paymentCheck = await pool.query('SELECT COUNT(*) FROM payments');
        if (parseInt(paymentCheck.rows[0].count) === 0) {
            console.log('Seeding initial payments...');
            await pool.query(`
                INSERT INTO payments (invoice, member, plan, amount, date, method, methodIcon, status, statusClass) VALUES
                ('INV-001', 'Rohit Sharma', 'Premium', '₹1,999', '01 Mar 2026', 'UPI', 'fas fa-mobile-alt', 'Paid', 'badge-success'),
                ('INV-002', 'Sneha Patel', 'Basic', '₹999', '15 Feb 2026', 'Card', 'fas fa-credit-card', 'Paid', 'badge-success'),
                ('INV-003', 'Amit Kumar', 'Elite', '₹3,499', '01 Feb 2026', 'Net Banking', 'fas fa-university', 'Failed', 'badge-danger')
            `);
        }

        // Seed Member Activities if empty
        const activityCheck = await pool.query('SELECT COUNT(*) FROM member_activities');
        if (parseInt(activityCheck.rows[0].count) === 0) {
            console.log('Seeding initial member activities...');
            await pool.query(`
                INSERT INTO member_activities (member_id, activity_type, duration, calories, intensity) VALUES
                ('user_123', 'Weight Training', 60, 450, 'High'),
                ('user_123', 'Cardio', 30, 300, 'Medium'),
                ('user_123', 'Yoga', 45, 150, 'Low'),
                ('user_123', 'Swimming', 40, 400, 'High'),
                ('user_123', 'Cycling', 50, 350, 'Medium')
            `);
        }

        // Seed Member Metrics if empty
        const metricsCheck = await pool.query('SELECT COUNT(*) FROM member_metrics');
        if (parseInt(metricsCheck.rows[0].count) === 0) {
            console.log('Seeding initial member metrics...');
            await pool.query(`
                INSERT INTO member_metrics (member_id, weight, height, bmi, body_fat) VALUES
                ('user_123', 75.5, 175, 24.7, 18.5)
            `);
        }

    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

initDB();

// Protected Middleware helper
const requireAuth = (req, res, next) => {
    const auth = getAuth(req);
    if (!auth.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// API Endpoints
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/payments', paymentRoutes);

// Stripe Checkout Endpoint
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { plan, amount } = req.body;

        // Parse amount from string like '1,999' to number 1999
        let unitAmount = 0;
        if (amount) {
            unitAmount = parseInt(amount.replace(/,/g, '').replace('₹', '')) * 100; // in paise for INR
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${plan} PowerFit Membership`,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:4200/membership?payment=success',
            cancel_url: 'http://localhost:4200/membership?payment=cancel',
        });

        res.json({ id: session.id, url: session.url });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Member Specific APIs
app.get('/api/member/activities/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query('SELECT * FROM member_activities WHERE member_id = $1 ORDER BY date DESC LIMIT 10', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Sync Clerk users from Member Portal to Admin DB
app.post('/api/members/sync', async (req, res) => {
    try {
        const { id, name, email } = req.body;
        if (!id || !email) return res.status(400).json({ error: 'Missing required fields' });

        // Check if member already exists in DB
        const existing = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
        if (existing.rows.length === 0) {
            await pool.query(
                `INSERT INTO members (id, name, email, plan, status, joined, statusClass, age, gender) 
                 VALUES ($1, $2, $3, 'Basic', 'Active', TO_CHAR(CURRENT_DATE, 'DD Mon YYYY'), 'badge-success', 0, 'Not specified')`,
                [id, name || 'Member', email]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error('Member Sync Error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/member/stats/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const metrics = await pool.query('SELECT * FROM member_metrics WHERE member_id = $1 ORDER BY date DESC LIMIT 1', [userId]);
        const activities = await pool.query('SELECT SUM(duration) as total_duration, SUM(calories) as total_calories FROM member_activities WHERE member_id = $1 AND date >= CURRENT_DATE - INTERVAL \'7 days\'', [userId]);

        res.json({
            metrics: metrics.rows[0] || null,
            weekly: activities.rows[0] || { total_duration: 0, total_calories: 0 }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dynamic Stats for Dashboard API
app.get('/api/stats', async (req, res) => {
    try {
        const membersCountRes = await pool.query('SELECT COUNT(*) FROM members');
        const activeCountRes = await pool.query("SELECT COUNT(*) FROM members WHERE status = 'Active'");
        const trainersCountRes = await pool.query('SELECT COUNT(*) FROM trainers');

        const membersCount = parseInt(membersCountRes.rows[0].count, 10);
        const activeCount = parseInt(activeCountRes.rows[0].count, 10);
        const trainersCount = parseInt(trainersCountRes.rows[0].count, 10);

        res.json({
            totalMembers: membersCount || 1240,
            activeMemberships: activeCount || 987,
            trainersCount: trainersCount || 28,
            revenue: '4.2L',
            attendance: { morning: 150, evening: 88, total: 238 }
        });
    } catch (err) {
        console.error('Stats API Error (using fallbacks):', err.message);
        res.json({
            totalMembers: 1240,
            activeMemberships: 987,
            trainersCount: 28,
            revenue: '4.2L',
            attendance: { morning: 150, evening: 88, total: 238 }
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

