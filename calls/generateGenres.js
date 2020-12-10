const fs = require('fs');

const writeGs = () => {
  let writeGenres = fs.createWriteStream(`./data/genres/0.csv`);

  for (let i = 1; i <= 100000; i += 1) {
    writeGenres.write(`${i}\n`);
  }
};

writeGs();

module.exports = {
  writeGs,
};
