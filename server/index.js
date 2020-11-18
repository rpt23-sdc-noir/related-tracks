const express = require('express');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const parser = require('body-parser');
const morgan = require('morgan');
const { addTrack, findTrack, updateTrack, deleteTrack, drop, close } = require('../relatedData.js');
const expressStaticGzip = require('express-static-gzip');
const app = express();

const port = 3001;

app.use(parser.json());
app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressStaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}))

// /relatedTracks/:song API
app.post('/relatedTracks/:song', (req, res) => {
  const track = {
    'song_id': req.params.song,
    'plays': req.body.plays,
    'likes': req.body.likes,
    'reposts': req.body.reposts,
    'comments': req.body.comments,
    'genre': req.body.genre,
    'onPlaylists': req.body.onPlaylists,
    'producedBy': req.body.producedBy,
    'likedBy': req.body.likedBy,
    'playedBy': req.body.playedBy,
    'repostedBy': req.body.repostedBy,
  };
  addTrack(track, (err, data) => {
    if (err) {
      console.log(`post err: ${err}`);
      res.status(500).send('we had trouble adding that track; try again later');
    } else {
      if (data === false) {
        res.status(404).send('Track already exists');
      } else {
        res.status(200).send(`Track ${req.params.song} added`);
      }
    }
  })
});

app.get('/relatedTracks/:song', (req, res) => {
  findTrack(req.params.song, (err, data) => {
    if (err) {
      console.log(chalk.red(`Problem obtaining track info: ${err}`));
      res.status(500).send('we had trouble finding that track; try again later');
    } else {
      if (data === null) {
        res.status(404).send('No such track');
      } else {
        res.send(data);
      }
    }
  });
});

app.put('/relatedTracks/:song', (req, res) => {
  const replacement = {
    'song_id': req.params.song,
    'plays': req.body.plays,
    'likes': req.body.likes,
    'reposts': req.body.reposts,
    'comments': req.body.comments,
    'genre': req.body.genre,
    'onPlaylists': req.body.onPlaylists,
    'producedBy': req.body.producedBy,
    'likedBy': req.body.likedBy,
    'playedBy': req.body.playedBy,
    'repostedBy': req.body.repostedBy,
  };
  updateTrack(req.params.song, replacement, (err, track) => {
    if (err) {
      console.log(`put error: ${err}`);
      res.status(500).end('we had trouble updating that track; try again later');
    } else {
      if (track === null || !track.song_id) {
        res.status(404).send('no such track');
      } else {
        console.log(`put data: ${track}`);
        res.status(200).send(`track ${track.song_id} put on`);
      }
    }
  });
});

app.delete('/relatedTracks/:song', (req, res) => {
  let song = req.params.song;
  deleteTrack(song, (err, track) => {
    if (err) {
      console.log(`delete error: ${err}`);
      res.status(500).end('we had trouble deleting that track; try again later');
    } else {
      if (track === null) {
        res.status(404).send('no such track');
      } else {
        res.status(200).send(`track ${track.song_id} deleted`);
      }
    }
  });
});

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
})

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})