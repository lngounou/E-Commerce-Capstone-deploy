const { Pool } = require('pg');

const pool = new Pool({
    user: 'ildakoleci',
    password: 'password',
    host: 'localhost',
    database: 'commerce',
    port: 5432,
});

module.exports = {
    pool, 
    ...require('./users'),
    ...require('./products'),
    ...require('./cart'),
}