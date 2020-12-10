const fs = require('fs');

const writePls = () => {
  let writePlaylists = fs.createWriteStream(`./data/playlists/0.csv`);

  for (let i = 1; i <= 5000000; i += 1) {
    writePlaylists.write(`${i}\n`);
  }
};

writePls();

module.exports = {
  writePls,
};
