const fs = require('fs');

const writeProd = () => {
  let writeProds = fs.createWriteStream(`./data/producers/0.csv`);

  for (let i = 1; i <= 1000000; i += 1) {
    writeProds.write(`${i}\n`);
  }
};

writeProd();

module.exports = {
  writeProd,
};
