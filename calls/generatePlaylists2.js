const fs = require('fs');

const writePls = () => {
  let writePlaylists = fs.createWriteStream(`./data/playlists/1.csv`);

  for (let i = 2500001; i <= 5000000; i += 1) {
    writePlaylists.write(`${i}\n`);
  }
};

writePls();

module.exports = {
  writePls,
};
