require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'ec2-3-101-125-2.us-west-1.compute.amazonaws.com',
  database: 'postgres',
  user: process.env.PGUSER,
  password: process.env.PGPWD,
  max: 95,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 0,
});

module.exports = {
  query: (text, params) => {
    return pool
      .connect()
      .then((client) => {
        return client
          .query(text, params)
          .then(async (res) => {
            // console.log('res: ', res);
            await client.release();
            return res;
          })
          .catch((err) => {
            client.release();
            console.log(err.stack);
          });
      });
  },
};
