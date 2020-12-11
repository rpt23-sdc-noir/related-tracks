const faker = require('faker');

const generateTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 100000)},${Math.ceil(Math.random() * 1000000)}\n`;
};

const generateTrackUser = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 5000000)}\n`;
};

const generatePlaylistTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 10000000)}\n`;
};

module.exports = {
  generateTrackUser,
  generatePlaylistTrack,
  generateTrack,
};
