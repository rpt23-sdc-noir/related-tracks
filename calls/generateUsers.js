const { createBigRecord } = require('../seeds/createBR.js');
const { generateUser } = require('../utils/generators');

createBigRecord(5000000, generateUser, 4, 'users', 'id,name');
