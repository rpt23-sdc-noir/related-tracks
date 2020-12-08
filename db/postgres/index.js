const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'sdc',
  max: 20,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params);
  },
};
