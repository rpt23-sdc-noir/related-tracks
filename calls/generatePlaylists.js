const { createBigRecord } = require('../seeds/createBR.js');
const { generatePlaylist } = require('../utils/generators');

createBigRecord(10000000, generatePlaylist, 4, 'playlists', 'id,name');
