const { generateTrackGenre } = require('../utils/generators');
const { createBigRecord } = require('../../seeds/createNeoBR.js');

createBigRecord(10000000, generateTrackGenre, 4, 'trackGenres', false, 0, 0, 'IS_ON');
