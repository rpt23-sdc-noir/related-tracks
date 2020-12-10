const fs = require('fs');

const writeU = () => {
  let writeUsers = fs.createWriteStream(`./data/users/0.csv`);

  for (let i = 2500001; i <= 5000000; i += 1) {
    writeUsers.write(`${i}\n`);
  }
};

writeU();

module.exports = {
  writeU,
};
