const { generateTrackUser } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(2500000, generateTrackUser, 4, 'plays', false, 0, 17);
