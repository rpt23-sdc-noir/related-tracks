const { generatePlaylistTrack } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(2500000, generatePlaylistTrack, 4, 'playlistTracks', false, 0, 36);
