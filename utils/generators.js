const faker = require('faker');

const generateTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 100000)},${Math.ceil(Math.random() * 1000000)}\n`;
};

const generateGenre = (id) => {
  return `${id + 1},${faker.random.words(2)}\n`;
};

const generateUser = (id) => {
  return `${id + 1},${`${faker.commerce.color()} ${faker.commerce.productMaterial()}`}\n`;
};

const generateProducer = (id) => {
  return `${id + 1},${`${faker.company.catchPhraseAdjective()} ${faker.company.catchPhraseNoun()}`}\n`;
};

const generatePlaylist = (id) => {
  return `${id + 1},${`${faker.hacker.ingverb()} ${faker.hacker.abbreviation()}`}\n`;
};

const generateTrackUser = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 5000000)},${Math.ceil(Math.random() * 10000000)}\n`;
};

const generatePlaylistTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 10000000)}\n`;
};

module.exports = {
  generateTrackUser,
  generateGenre,
  generatePlaylist,
  generatePlaylistTrack,
  generateProducer,
  generateTrack,
  generateUser,
};
