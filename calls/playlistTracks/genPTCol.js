const { generatePlaylistTrack } = require('../../utils/generators');
const { createBigRecord } = require('../../seeds/createBR.js');

createBigRecord(10000000, generatePlaylistTrack, 10, 'playlistTracks', 'id,playlist,track');