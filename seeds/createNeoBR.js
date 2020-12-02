const fs = require('fs');
const { generateGenre } = require('../utils/generators');

const createBigRecord = (size, recordGenerator, spins, recordType, columns = false, count = 0, batch = 0, rel = false) => {
  let totalSize = size + 0;
  let totalSpins = spins + 0;
  const loadSize = Math.ceil(totalSize/totalSpins);
  while (totalSpins) {
    count += 1;
    console.log(`totalSpins left for ${recordType}: ${totalSpins}`);
    let records = fs.createWriteStream(`/Users/maxgektin/Documents/Remote/sdc/local/related-tracks/neo4j_data/records/${recordType}/${(batch * spins) + count}.csv`);
    let curLoad = loadSize + 0;
    if (spins === totalSpins && columns) {
      records.write(`${columns}\n`);
    }
    while (curLoad) {
      if (rel) {
        var record = recordGenerator(batch * size + size - totalSize, rel);
      } else {
        var record = recordGenerator(batch * size + size - totalSize);
      }
      records.write(record);
      totalSize -= 1;
      curLoad -= 1;
    }
    records.end();
    totalSpins -= 1;
  }
};

module.exports = {
  createBigRecord,
};
