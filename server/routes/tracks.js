const Router = require('express-promise-router');
const { addData, updateData, deleteAttribute, findTrackData, findRelatedPlaylists, findTrackFromPlaylist, test, getInfo } = require('../../db/postgres/queries.js');
const { checkCache, client } = require('../../db/redis/client.js');

const router = new Router();
const trowka = [
  {
    playlist: (Math.floor(Math.random() * 10000000) + 1),
  },
  {
    playlist: (Math.floor(Math.random() * 10000000) + 1),
  },
  {
    playlist: (Math.floor(Math.random() * 10000000) + 1),
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
    let { rows } = await getInfo(id);
    // console.log(rows);
    let tracks = [];
    for (let i = 0; i < rows.length; i += 1) {
      let current = rows[i];
      let track = {};
      track.song_id = current.track;
      track.plays = current.playcount;
      track.likes = current.likecount;
      track.comments = current.commentcount;
      track.reposts = current.repostcount;
      tracks.push(track);
    }
    const strung = JSON.stringify(tracks);
    // console.log(strung);
    await client.zadd('relatedtracks', id, strung);
    res.status(200).end(strung);
    // rows = rows.concat(trowka).slice(0, 3);
    // res.write('[');
    // await rows.reduce(async (memo, row, index) => {
    //   await memo;
    //   let tracks = await findTrackFromPlaylist(row.playlist, id);
    //   if (tracks.rows.length < 1) {
    //     tracks.rows = [
    //       {
    //         track: (Math.floor(Math.random() * (id - 1)) + 1),
    //       }
    //     ]
    //   }
    //   let trackId = tracks.rows[0].track;
    //   let plays = await findPlays(trackId);
    //   let likes = await findLikes(trackId);
    //   let comments = await findComments(trackId);
    //   let reposts = await findReposts(trackId);
    //   plays = plays.rows[0].count;
    //   likes = likes.rows[0].count;
    //   comments = comments.rows[0].count;
    //   reposts = reposts.rows[0].count;
    //   console.log(plays);
    //   let track = {
    //     plays,
    //     likes,
    //     comments,
    //     reposts,
    //     song_id: trackId,
    //   };
    //   console.log(track);
    //   const strung = JSON.stringify(track);
    //   res.write(strung);
    //   if (index < 2) {
    //     res.write(',');
    //   }
    // }, undefined);
    // return res.status(200).end(']');
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

router.put('/update', async (req, res) => {
  try {
    let { updated, old, } = req.body;
    updated = parseInt(updated);
    old = parseInt(old);
    if (old < 1 || old > 10000000 || old !== old) {
      return res.status(400).end('no such playlist');
    }
    let update = await updateData({ updated, old, });
    return res.status(200).end('playlist updated');
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    let { id } = req.params;
    const { table } = req.body
    id = parseInt(id);
    if (id < 1 || id > 10000000 || id !== id) {
      return res.status(400).end('no such track');
    }
    let remove = await deleteAttribute(table, id);
    if (remove.rows.length !== 1) {
      return res.status(400).end(`track ${id} doesn't have any ${table}`);
    } else {
      return res.status(200).end(`track ${id} has one fewer ${table.substring(0, table.length - 1)}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});
