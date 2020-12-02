const { createBigRecord } = require('../seeds/createNeoBR.js');
const { generateProducer } = require('../utils/generators');

createBigRecord(1000000, generateProducer, 4, 'producers');
