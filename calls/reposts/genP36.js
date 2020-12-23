const { generateTrackUser } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(2500000, generateTrackUser, 4, 'reposts', false, 0, 36);
