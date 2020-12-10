const fs = require('fs');

const writePls = () => {
  let writePlaylists = fs.createWriteStream(`./data/playlists/1.csv`);

  for (let i = 5000001; i <= 10000000; i += 1) {
    writePlaylists.write(`${i}\n`);
  }
};

writePls();

module.exports = {
  writePls,
};
