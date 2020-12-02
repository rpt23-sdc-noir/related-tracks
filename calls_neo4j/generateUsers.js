const { createBigRecord } = require('../seeds/createNeoBR.js');
const { generateUser } = require('../utils/generators');

createBigRecord(5000000, generateUser, 4, 'users');
