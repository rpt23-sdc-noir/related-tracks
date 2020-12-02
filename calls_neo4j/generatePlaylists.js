const { createBigRecord } = require('../seeds/createNeoBR.js');
const { generatePlaylist } = require('../utils/generators');

createBigRecord(10000000, generatePlaylist, 4, 'playlists');
