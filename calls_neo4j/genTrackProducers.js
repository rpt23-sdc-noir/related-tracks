const { generateTrackProducer } = require('../utils/generators');
const { createBigRecord } = require('../../seeds/createNeoBR.js');

createBigRecord(10000000, generateTrackProducer, 4, 'trackProducers', false, 0, 0, 'PRODUCED_BY');
