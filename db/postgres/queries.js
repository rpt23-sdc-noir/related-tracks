const { query } = require('./index.js');

const test = () => {
  return query('SELECT * FROM playlistTracks WHERE track = 9001000', null);
};

const addData = (table, data) => {
  console.log(data);
  const { playlist, track, } = data;
  if (!table) {
    return null;
  } else if (table === 'playlistTracks') {
    const text = `INSERT INTO ${table}(id, playlist, track) VALUES (nextval('pt_id'), ${parseInt(playlist)}, ${parseInt(track)})`;
    return query(text, null);
  } else if (table === 'plays' || table === 'likes' || table === 'reposts' || table === 'comments') {
    const text = `INSERT INTO ${table}(id, track_id) VALUES (nextval('${table.substring(0, (table.length - 1))}_id'), ${parseInt(track)})`;
    return query(text, null);
  } else {
    return null;
  }
};

const findTrackData = function(id) {
  const text = `SELECT (SELECT COUNT(*) FROM plays WHERE track_id = ${id}) AS plays, (SELECT COUNT(*) FROM likes WHERE track_id = ${id}) AS likes,(SELECT COUNT(*) FROM reposts WHERE track_id = ${id}) AS reposts, (SELECT COUNT(*) FROM comments WHERE track_id = ${id}) AS comments`;
  return query(text, null);
};

const findRelatedPlaylists = (id) => {
  const text = `SELECT playlist FROM playlistTracks WHERE track = ${id} LIMIT 3`;
  return query(text, null);
};

const findTrackFromPlaylist = (id, track) => {
  const text = `SELECT track FROM playlistTracks WHERE playlist = ${id} AND track <> ${track} LIMIT 1`;
  return query(text, null);
};

const updateData = function(table, data) {
  const { now, old, } = data;
  if (table !== 'playlistTracks') {
    return null;
  } else {
    const text = `UPDATE playlistTracks SET (track) = (${now}) WHERE track = ${old}`;
    return query(text, null);
  }
};

const deleteTrack = function (table, id) {
  if (table === 'plays' || table === 'likes' || table === 'reposts' || table === 'comments') {
    const text = `DELETE FROM ${table} WHERE track_id = ${id} LIMIT 1 RETURNING *`;
    return query(text, null);
  }
  return null;
};

module.exports = {
  addData,
  findTrackData,
  findRelatedPlaylists,
  findTrackFromPlaylist,
  updateData,
  test,
  deleteTrack,
};
