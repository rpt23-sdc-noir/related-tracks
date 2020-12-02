const { createBigRecord } = require('../seeds/createNeoBR.js');
const { generateGenre } = require('../utils/generators');

createBigRecord(100000, generateGenre, 1, 'genres');
