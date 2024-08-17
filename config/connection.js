const { Pool } = require('pg');
require('dotenv').config()


// Connection String For Postgresql
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_URL
    // user: process.env.PG_USER,
    // host: process.env.PG_HOST,
    // port: process.env.PG_PORT,
    // database: process.env.PG_DATABASE,
    // password: process.env.PG_PASSWORD
});


pool.connect()
    .then(() => { console.log('Connected to PostgreSQL database!'); })
    .catch((err) => { console.error('Error connecting to the database:', err); });
module.exports = pool;