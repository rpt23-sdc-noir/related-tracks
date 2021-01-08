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
    const text = `INSERT INTO ${table}(id, track) VALUES (nextval('${table.substring(0, (table.length - 1))}_id'), ${parseInt(track)})`;
    return query(text, null);
  } else {
    return null;
  }
};

const getInfo = function(id) {
  const text = `SELECT * FROM counts WHERE track IN (SELECT track FROM related_playlists WHERE playlist IN (SELECT playlist FROM playlists WHERE track = ${id}) AND track <> ${id} LIMIT 3)`;
    return query(text, null);
};

const findTrackData = function(id1, id2, id3, track) {
  const text = `SELECT (SELECT COUNT(*) FROM plays WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id1} AND track <> ${track} LIMIT 1)) AS plays1, (SELECT COUNT(*) FROM likes WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id1} AND track <> ${track} LIMIT 1)) AS likes1,(SELECT COUNT(*) FROM reposts WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id1} AND track <> ${track} LIMIT 1)) AS reposts1, (SELECT COUNT(*) FROM comments WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id1} AND track <> ${track} LIMIT 1)) AS comments1, (SELECT COUNT(*) FROM plays WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id2} AND track <> ${track} LIMIT 1)) AS plays2, (SELECT COUNT(*) FROM likes WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id2} AND track <> ${track} LIMIT 1)) AS likes2,(SELECT COUNT(*) FROM reposts WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id2} AND track <> ${track} LIMIT 1)) AS reposts2, (SELECT COUNT(*) FROM comments WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id2} AND track <> ${track} LIMIT 1)) AS comments2, (SELECT COUNT(*) FROM plays WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id3} AND track <> ${track} LIMIT 1)) AS plays3, (SELECT COUNT(*) FROM likes WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id3} AND track <> ${track} LIMIT 1)) AS likes3,(SELECT COUNT(*) FROM reposts WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id3} AND track <> ${track} LIMIT 1)) AS reposts3, (SELECT COUNT(*) FROM comments WHERE track = (SELECT track FROM playlistTracks WHERE playlist = ${id3} AND track <> ${track} LIMIT 1)) AS comments3`;
  return query(text, null);
};

const findPlays = function(id) {
  const text = `SELECT COUNT(*) FROM plays WHERE track = ${id}`;
  return query(text, null);
};

const findLikes = function(id) {
  const text = `SELECT COUNT(*) FROM likes WHERE track = ${id}`;
  return query(text, null);
};

const findComments = function(id) {
  const text = `SELECT COUNT(*) FROM comments WHERE track = ${id}`;
  return query(text, null);
};

const findReposts = function(id) {
  const text = `SELECT COUNT(*) FROM reposts WHERE track = ${id}`;
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

const updateData = function(data) {
  const { updated, old, } = data;
  const text = `UPDATE playlistTracks SET playlist = ${updated} WHERE playlist = ${old}`;
  return query(text, null);
};

const deleteAttribute = function (table, id) {
  if (table === 'likes' || table === 'reposts' || table === 'comments') {
    const text = `DELETE FROM ${table} WHERE track = ${id} AND id IN (SELECT id FROM ${table} WHERE track = ${id} LIMIT 1) RETURNING *`;
    return query(text, null);
  }
  return null;
};

module.exports = {
  addData,
  findTrackData,
  findPlays,
  findLikes,
  findComments,
  findReposts,
  findRelatedPlaylists,
  findTrackFromPlaylist,
  updateData,
  test,
  getInfo,
  deleteAttribute,
};

/*`WITH ptracks AS (
  SELECT DISTINCT ON (playlist) track FROM playlistTracks WHERE playlist IN (SELECT playlist FROM playlistTracks WHERE track = ${id} LIMIT 3) AND track <> ${id} ORDER BY playlist, track DESC),
  trackplays AS (
  SELECT plays.track, COUNT(*) FROM plays WHERE track IN (SELECT track FROM ptracks) GROUP BY plays.track
  ),
  tracklikes as (
  SELECT likes.track, COUNT (*) FROM likes WHERE track IN (SELECT track FROM ptracks) GROUP BY likes.track
  ),
  trackcomments as (
  SELECT comments.track, COUNT (*) FROM comments WHERE track IN (SELECT track FROM ptracks) GROUP BY comments.track
  ),
  trackreposts as (
  SELECT reposts.track, COUNT (*) FROM reposts WHERE track IN (SELECT track FROM ptracks) GROUP BY reposts.track
  )
  SELECT DISTINCT ON (track)trackplays.track, trackplays.count, tracklikes.count, trackcomments.count, trackreposts.count FROM trackplays, tracklikes, trackcomments, trackreposts WHERE trackplays.track = tracklikes.track AND trackplays.track = trackcomments.track AND trackplays.track = trackreposts.track;`*/
