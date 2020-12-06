const Router = require('express-promise-router');
const { addTrack,  addProducer, addGenre, updateTrack, deleteTrack, findTrack, findTrackData, findRelatedPlaylists, findTrackFromPlaylist, } = require('../../db/postgres/queries.js');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { rows } = await findRelatedPlaylists(id);
    if (rows.length < 1) {
      res.status(400).end('track added too recently or it doesn\'t exist, no related tracks quite yet');
    } else {
      res.write('[');
      await rows.reduce(async (memo, row, index) => {
        await memo;
        let tracks = await findTrackFromPlaylist(row.playlist_id, id);
        let trackId = tracks.rows[0].track_id;
        let track = await findTrackData(trackId);
        track.rows[0].song_id = trackId;
        res.write(JSON.stringify(track.rows[0]));
        if (index < 2) {
          res.write(',');
        }
      }, undefined);
      return res.status(200).end(']');
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get('/current/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { rows } = await findTrackData(id);
    if (rows.length < 1) {
      res.status(400).end('no such track');
    } else {
      res.status(200).end(JSON.stringify(rows[0]));
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.post('/add', async (req, res) => {
  try {
    await addTrack();
    await addProducer(req.body.producer);
    await addGenre(req.body.genre);
    res.status(200).end('track added');
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let check = await findTrack(id);
    if (check.rows.length < 1) {
      res.status(400).end(`no track with id ${id}`);
    } else {
      const genre = req.body.genre;
      const producer = req.body.producer;
      await updateTrack(id, genre, producer);
      res.status(200).end(`track ${id} updated`)
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let check = await findTrack(id);
    if (check.rows.length < 1) {
      res.status(400).end(`no track with id ${id}`);
    } else {
      await deleteTrack(id);
      res.status(200).end(`track ${id} deleted`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});
