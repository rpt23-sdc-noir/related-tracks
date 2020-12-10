const { generateTrackUser } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(5000000, generateTrackUser, 4, 'likes', false, 0, 2);
