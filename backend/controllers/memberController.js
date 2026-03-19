const pool = require('../config/db');

exports.getAllMembers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM members ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMember = async (req, res) => {
    try {
        const { name, age, gender, phone, email, plan } = req.body;

        let photoUrl = '';
        if (req.file) {
            photoUrl = req.file.path;
        }

        // Auto Generate ID M00X
        const currentCountRes = await pool.query('SELECT COUNT(*) FROM members');
        const count = parseInt(currentCountRes.rows[0].count, 10);
        const memberId = `#M${String(count + 1).padStart(3, '0')}`;

        // joined date logic
        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const joinedDate = new Date();
        const joined = joinedDate.toLocaleDateString('en-GB', dateOptions);

        // expires date logic
        let expiresDate = new Date();
        if (plan === 'Basic') expiresDate.setMonth(expiresDate.getMonth() + 3);
        else if (plan === 'Premium') expiresDate.setFullYear(expiresDate.getFullYear() + 1);
        else expiresDate.setFullYear(expiresDate.getFullYear() + 1);

        const expires = expiresDate.toLocaleDateString('en-GB', dateOptions);
        const status = 'Active';
        const statusClass = 'badge-success';

        const insertQuery = `
            INSERT INTO members (id, name, age, gender, phone, email, plan, photoUrl, joined, expires, status, statusClass)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `;

        const values = [memberId, name, age, gender, phone, email, plan, photoUrl, joined, expires, status, statusClass];
        const newMember = await pool.query(insertQuery, values);

        res.status(201).json(newMember.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        // The id from frontend might be _id due to earlier mongoose logic, let's use internal serial or varchar id
        // Since we changed to PG, the row might have "id" as primary key or uuid
        // Usually, previous frontend deleted by _id, so we better create a _id or map it.
        // Wait, 'req.params.id' in pg logic could be the 'id' (e.g. #M001). 
        // We'll delete by 'id' 
        await pool.query('DELETE FROM members WHERE id = $1', [id]);
        res.json({ message: 'Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
