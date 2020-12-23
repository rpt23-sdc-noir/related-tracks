require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'ec2-13-57-194-216.us-west-1.compute.amazonaws.com',
  database: 'sdc',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 100,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params);
  },
};
