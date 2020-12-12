const Router = require('express-promise-router');
const { addData, updateData, deleteTrack, findTrackData, findRelatedPlaylists, findTrackFromPlaylist, test, } = require('../../db/postgres/queries.js');
const { checkCache, client } = require('../../db/redis/client.js');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
const trowka = [
  {
    playlist_id: (Math.floor(Math.random() * 10000000) + 1),
  },
  {
    playlist_id: (Math.floor(Math.random() * 10000000) + 1),
  },
  {
    playlist_id: (Math.floor(Math.random() * 10000000) + 1),
  }
];

// export our router to be mounted by the parent application
module.exports = router;

router.get('/test', async (req, res) => {
  try {
    let testing = await test();
    let rows = JSON.stringify(testing.rows);
    return res.end(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.get('/:id', checkCache, async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    let { rows } = await findRelatedPlaylists(id);
    rows = rows.concat(trowka).slice(0, 3);
    res.write('[');
    await rows.reduce(async (memo, row, index) => {
      await memo;
      let tracks = await findTrackFromPlaylist(row.playlist_id, id);
      if (tracks.rows.length < 1) {
        tracks.rows = [
          {
            track_id: (Math.floor(Math.random() * (id - 1)) + 1),
          }
        ]
      }
      let trackId = tracks.rows[0].track_id;
      let track = await findTrackData(trackId);
      track.rows[0].song_id = trackId;
      const strung = JSON.stringify(track.rows[0]);
      await client.zadd('relatedtracks', id, strung);
      res.write(strung);
      if (index < 2) {
        res.write(',');
      }
    }, undefined);
    return res.status(200).end(']');
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.get('/current/:id', checkCache, async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (id < 1 || id > 10000000 || id !== id) {
      return res.status(400).end('no such track');
    }
    let { rows } = await findTrackData(id);
    if (rows.length < 1) {
      return res.status(400).end('no such track');
    } else {
      return res.status(200).end(JSON.stringify(rows[0]));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.post('/add/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const { track, playlist, } = req.body;
    await addData(table, {
      track,
      playlist,
    });
    return res.status(200).end('data added');
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (id < 1 || id > 10000000 || id !== id) {
      return res.status(400).end('no such track');
    }
    let check = await findTrack(id);
    if (check.rows.length < 1) {
      return res.status(400).end(`no track with id ${id}`);
    } else {
      const genre = req.body.genre;
      const producer = req.body.producer;
      await updateTrack(id, genre, producer);
      return res.status(200).end(`track ${id} updated`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (id < 1 || id > 10000000 || id !== id) {
      return res.status(400).end('no such track');
    }
    let check = await findTrack(id);
    if (check.rows.length < 1) {
      return res.status(400).end(`no track with id ${id}`);
    } else {
      await deleteTrack(id);
      return res.status(200).end(`track ${id} deleted`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});
