const { query, } = require('./index.js');

const addTrack = function() {
  const text = `INSERT INTO tracks (id, genre, producer) VALUES (nextval('tracks_id_seq'), nextval('genres_id_seq'), nextval('prods_id_seq'))`;
  return query(text, null);
};

const addProducer = function(name) {
  const text = `INSERT INTO producers (id, name) VALUES (currval('prods_id_seq'), ${name})`;
  return query(text, null);
};

const addGenre = function(name) {
  const text = `INSERT INTO genres (id, name) VALUES (currval('genres_id_seq'), ${name})`;
  return query(text, null);
};

const findTrack = (id) => {
  const text = `SELECT * FROM tracks WHERE id = ${id}`;
  return query(text, null);
};

const findTrackData = function(id) {
  const text = `SELECT (SELECT COUNT(*) FROM plays WHERE track_id = ${id}) AS plays,(SELECT COUNT(*)FROM likes WHERE track_id = ${id}) AS likes,(SELECT COUNT(*) FROM reposts WHERE track_id = ${id}) AS reposts, (SELECT COUNT(*) FROM comments WHERE track_id = ${id}) AS comments`;
  return query(text, null);
};

const findRelatedPlaylists = (id) => {
  const text = `SELECT playlist_id FROM playlistTracks WHERE track_id = ${id} LIMIT 3`;
  return query(text, null);
};

const findTrackFromPlaylist = (id, track) => {
  const text = `SELECT track_id FROM playlistTracks WHERE playlist_id = ${id} AND track_id <> ${track} LIMIT 1`;
  return query(text, null);
};

const updateTrack = function(id, genre, producer) {
  if (genre && producer) {
    const text = `UPDATE tracks SET (genre, producer) = (${`'${genre}', '${producer}'`}) WHERE id = ${id}`;
    return query(text, null);
  } else if (genre) {
    const text = `UPDATE tracks SET (genre) = (${`'${genre}'`}) WHERE id = ${id} `;
    return query(text, null);
  } else if (producer) {
    const text = `UPDATE tracks SET (producer) = (${`'${producer}'`}) WHERE id = ${id} `;
    return query(text, null);
  }
};

const deleteTrack = function (id) {
  const text = `DELETE FROM tracks WHERE id = ${id} RETURNING *`;
  return query(text, null);
};

module.exports = {
  addTrack,
  addProducer,
  findTrack,
  findTrackData,
  findRelatedPlaylists,
  findTrackFromPlaylist,
  updateTrack,
  deleteTrack,
  addGenre,
};
