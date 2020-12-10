const { createBigRecord } = require('../seeds/createBR.js');
const { generateTrack } = require('../utils/generators');

createBigRecord(5000000, generateTrack, 4, 'tracks', false, 0, 1);
