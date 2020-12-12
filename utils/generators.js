const generateTrackUser = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 10000000)}\n`;
};

const generatePlaylistTrack = (id) => {
  return `${id + 1},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 10000000)}\n`;
};

module.exports = {
  generateTrackUser,
  generatePlaylistTrack,
};
