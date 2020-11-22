const { createBigRecord } = require('../seeds/createBR.js');
const { generateProducer } = require('../utils/generators');

createBigRecord(1000000, generateProducer, 4, 'producers', 'id,name');
