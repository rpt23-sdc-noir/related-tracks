const { generatePlaylistTrack } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(5000000, generatePlaylistTrack, 4, 'playlistTracks', false, 0, 6);
