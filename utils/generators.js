const faker = require('faker');

const generateTrack = (id) => {
  return `${id + 1},Track\n`;
};

const generateGenre = (id) => {
  return `${id + 1},${faker.random.words(2)},Genre\n`;
};

const generateUser = (id) => {
  return `${id + 1},${`${faker.commerce.color()} ${faker.commerce.productMaterial()},User\n`}`;
};

const generateProducer = (id) => {
  return `${id + 1},${`${faker.company.catchPhraseAdjective()} ${faker.company.catchPhraseNoun()},Producer\n`}`;
};

const generatePlaylist = (id) => {
  return `${id + 1},${`${faker.hacker.ingverb()} ${faker.hacker.abbreviation()},Playlist\n`}`;
};

const generateTrackUser = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 5000000)},${rel}\n`;
};

const generatePlaylistTrack = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 10000000)},${rel}\n`;
};

const generateTrackGenre = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 100000)},${rel}\n`;
};

const generateTrackProducer = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 1000000)},${rel}\n`;
};

module.exports = {
  generateTrackUser,
  generateGenre,
  generatePlaylist,
  generatePlaylistTrack,
  generateProducer,
  generateTrack,
  generateUser,
  generateTrackGenre,
  generateTrackProducer,
};
