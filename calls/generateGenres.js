const { createBigRecord } = require('../seeds/createBR.js');
const { generateGenre } = require('../utils/generators');

createBigRecord(100000, generateGenre, 4, 'genres', 'id,name');
