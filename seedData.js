// const { addTrack, findTrack, updateTrack, deleteTrack, drop, close } = require('./relatedData.js');
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const chalk = require('chalk');
const faker = require('faker');
const { execFile } = require('child_process');
const merge = require('merge-files');
const {
  generateTrackUser,
  generateGenre,
  generatePlaylist,
  generatePlaylistTrack,
  generateProducer,
  generateTrack,
  generateUser,
} = require('./utils/generators');

const createBigRecord = (size, recordGenerator, spins, recordType, columns, count = 0) => {
  let totalSize = size + 0;
  let totalSpins = spins + 0;
  const paths = [];
  const loadSize = Math.ceil(totalSize/totalSpins);
  while (totalSpins) {
    count += 1;
    console.log(`totalSpins left for ${recordType}: ${totalSpins}`);
    let records = fs.createWriteStream(`./data/${recordType}/${count}.csv`);
    paths.push(`./data/${recordType}/${spins + 1 - totalSpins}.csv`);
    let curLoad = loadSize + 0;
    if (spins === totalSpins && columns) {
      records.write(`${columns}\n`);
    }
    while (curLoad) {
      let record = recordGenerator(size - totalSize);
      records.write(record);
      totalSize -= 1;
      curLoad -= 1;
    }
    records.end();
    totalSpins -= 1;
  }
  return merge(paths, `./data/${recordType}/${recordType}.csv`)
    .then(() => {
      console.log('merge complete');
    });
};

const reposts = execFile('./seeds/generateReposts.js', { timeout: 10000 });

/*const genners = ['pop', 'rock', 'rap', 'r&b', 'punk', 'emo', 'classical', 'jazz', 'spoken', 'ambient'];

const producers = ['dre', 'michael williams', 'zaytoven', 'bialystock unt bloom', 'stock boy'];

const seedData = function() {
  return new Promise((resolve, reject) => {
    drop();
    resolve();
  })
  .then(() => {
    for (let i = 1; i <= 1000000; i += 1) {
      let current = {
        song_id: i,
        plays: Math.ceil(Math.random() * 10000),
        likes: Math.ceil(Math.random() * 1000),
        reposts: Math.ceil(Math.random() * 100),
        comments: Math.ceil(Math.random() * 100),
        genre: genners[Math.floor(Math.random() * genners.length)],
        onPlaylists: [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)],
        producedBy: producers[Math.floor(Math.random() * producers.length)],
        likedBy: [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)],
        playedBy: [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)],
        repostedBy: [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)],
      };
      // addTrack(current, () => {});
    }
  })
  .catch((err) => {
    console.log(`seeding err: ${err}`);
  });
};

// seedData();*/
