const faker = require('faker');

const generateTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 100000)},${Math.ceil(Math.random() * 1000000)}`;
};

const generateTrackUser = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 5000000)},${rel}\n`;
};

const generatePlaylistTrack = (id, rel) => {
  return `${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 10000000)},${rel}\n`;
};

module.exports = {
  generateTrackUser,
  generatePlaylistTrack,
  generateTrack,
};
