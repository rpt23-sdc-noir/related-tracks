const { query } = require('./index.js');

const test = () => {
  return query('SELECT * FROM tracks');
};

let check = true;

const addTrack = function() {
  // const text = `WITH ins1 AS (INSERT INTO tracks (id, genre, producer) VALUES (nextval('tracks_id_seq'), nextval('genres_id_seq'), nextval('prods_id_seq')) RETURNING genre, producer),ins2 AS (INSERT INTO producers(id) SELECT producer FROM ins1),ins3 AS (INSERT INTO genres(id) SELECT genre FROM ins1)
  // SELECT genre, producer FROM ins1;`;
  const text = (
    (check)
    ?
    `WITH ins1 AS (INSERT INTO tracks (id, genre, producer) VALUES (nextval('tracks_id_seq'), nextval('genres_id_seq'), nextval('prods_id_seq')) RETURNING genre, producer),ins2 AS (INSERT INTO producers(id) SELECT producer FROM ins1),ins3 AS (INSERT INTO genres(id) SELECT genre FROM ins1)
    SELECT genre, producer FROM ins1;`
    :
    `INSERT INTO tracks (id, genre, producer) VALUES (nextval('tracks_id_seq'), ${Math.floor(Math.random() * 100000) + 1}, ${Math.floor(Math.random() * 1000000) + 1})`
  );
  check = !check;
  return query(text, null);
};

const findTrack = (id) => {
  const text = `SELECT * FROM tracks WHERE id = ${id}`;
  return query(text, null);
};

const findTrackData = function(id) {
  const text = `SELECT (SELECT COUNT(*) FROM plays WHERE track_id = ${id}) AS plays, (SELECT COUNT(*) FROM likes WHERE track_id = ${id}) AS likes,(SELECT COUNT(*) FROM reposts WHERE track_id = ${id}) AS reposts, (SELECT COUNT(*) FROM comments WHERE track_id = ${id}) AS comments`;
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

const findCurrentProducer = () => {
  const text = 'SELECT nextval(prods_id_seq)';
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
  findTrack,
  findTrackData,
  findRelatedPlaylists,
  findTrackFromPlaylist,
  updateTrack,
  test,
  deleteTrack,
};
