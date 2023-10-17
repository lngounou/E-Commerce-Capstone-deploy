const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'http://localhost:5432/commerce';
// const connectionString =  "postgresql://postgres:root@localhost:5432/commerce"

const db = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = db;
