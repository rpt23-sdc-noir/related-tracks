const { addTrack, findTrack, updateTrack, deleteTrack, drop, close } = require('./relatedData.js');
const chalk = require('chalk');

const genners = ['pop', 'rock', 'rap', 'r&b', 'punk', 'emo', 'classical', 'jazz', 'spoken', 'ambient'];

const producers = ['dre', 'michael williams', 'zaytoven', 'bialystock unt bloom', 'stock boy'];

let seedData = function() {
  return new Promise((resolve, reject) => {
    drop();
    resolve();
  })
  .then(() => {
    for (let i = 1; i <= 100; i += 1) {
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
      addTrack(current, () => {});
    }
  })
  .catch((err) => {
    console.log(`seeding err: ${err}`);
  });
};

seedData();
