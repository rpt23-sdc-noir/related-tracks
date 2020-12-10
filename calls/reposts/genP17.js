const { generateTrackUser } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(5000000, generateTrackUser, 4, 'reposts', false, 0, 17);
