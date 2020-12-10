const fs = require('fs');

const writeGs = () => {
  let writePlaylists = fs.createWriteStream(`./data/playlists/0.csv`);

  for (let i = 1; i <= 100000; i += 1) {
    writePlaylists.write(`${i}\n`);
  }
};

writeGs();

module.exports = {
  writeGs,
};
