const { createBigRecord } = require('../seeds/createNeoBR.js');
const { generateTrack } = require('../utils/generators');

createBigRecord(10000000, generateTrack, 4, 'tracks');
