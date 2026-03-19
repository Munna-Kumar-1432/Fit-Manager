const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.PG_URI,
});

pool.on('connect', () => {
    console.log('PostgreSQL DB Connected Successfully!');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle pg client', err);
    process.exit(-1);
});

module.exports = pool;
