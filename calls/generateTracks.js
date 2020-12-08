const { createBigRecord } = require('../seeds/createBR.js');
const { generateTrack } = require('../utils/generators');

createBigRecord(10000000, generateTrack, 4, 'tracks', 'id,genre,producer');
