const fs = require('fs');

const writeU = () => {
  let writeUsers = fs.createWriteStream(`./data/users/0.csv`);

  for (let i = 1; i <= 2500000; i += 1) {
    writeUsers.write(`${i}\n`);
  }
};

writeU();

module.exports = {
  writeU,
};
