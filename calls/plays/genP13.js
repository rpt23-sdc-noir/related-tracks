const { generateTrackUser } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(10000000, generateTrackUser, 4, 'plays', false, 0, 13);
