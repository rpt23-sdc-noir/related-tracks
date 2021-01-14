// require('newrelic');
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const expressStaticGzip = require('express-static-gzip');
const app = express();
const tracks = require('./routes/tracks.js');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
require('@babel/register');
const RelatedTracks = require('../client/components/relatedData.jsx').default;


const port = 3001;

app.use(parser.json());
app.use(morgan('dev'));
app.get(`/${process.env.LOADER}/`, (req, res) => {
  console.log('attempted to go to loader.io page');
  res.send(process.env.LOADER);
});
app.use('/relatedTracks', tracks);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressStaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../favicon.png'));
});

app.get('/:current', async (req, res) => {
  // res.sendFile(path.join(__dirname,'../public/index.html'));
  try {
    let { current } = req.params;
    let data = await axios.get(`http://54.241.135.150/relatedTracks/${current}`)
      .then(({ data }) => {
        // console.log(data);
        // data = JSON.stringify(data);
        return data;
      });
    // console.log('data: ', data)
    let song0nameImg = await axios.get(`http://52.8.174.151:8880/songdata/${data[0].song_id}`)
      .then(({ data }) => {
        console.log('song0 data: ', data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);

        return {
          name: 'First of Her Name',
          image: 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
        };
      });
    let song1nameImg = await axios.get(`http://52.8.174.151:8880/songdata/${data[1].song_id}`)
      .then(({ data }) => {
        // console.log('song1 data: ', data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);
        return {
          name: '"Marcia, Marcia, Marcia"',
          image: 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
        };
      });
    let song2nameImg = await axios.get(`http://52.8.174.151:8880/songdata/${data[2].song_id}`)
      .then(({ data }) => {
        // console.log(data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);
        return {
          name: 'Is This It',
          image: 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
        };
      });
    // console.log(song0nameImg);
    let song0band = await axios.get(`http://52.8.174.151:8880/artistBio/${data[0].song_id}`)
      .then(({ data }) => {
        console.log('song0 data: ', data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);

        return {
          band: 'Siouxsie & the Banshees',
        };
      });
    let song1band = await axios.get(`http://52.8.174.151:8880/artistBio/${data[1].song_id}`)
      .then(({ data }) => {
        console.log('song0 data: ', data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);

        return {
          band: 'Eve Plumb',
        };
      });
    let song2band = await axios.get(`http://52.8.174.151:8880/artistBio/${data[2].song_id}`)
      .then(({ data }) => {
        console.log('song0 data: ', data);
        // data = JSON.stringify(data);
        return data;
      })
      .catch((err) => {
        // console.log('ERROR: ', err);

        return {
          band: 'The Strokes',
        };
      });
    let song0 = {
      track: data[0].song_id,
      plays: data[0].plays,
      likes: data[0].likes,
      comments: data[0].comments,
      reposts: data[0].reposts,
      name: song0nameImg.name,
      image: song0nameImg.image,
      band: song0band.band,
    };
    let song1 = {
      track: data[1].song_id,
      plays: data[1].plays,
      likes: data[1].likes,
      comments: data[1].comments,
      reposts: data[1].reposts,
      name: song1nameImg.name,
      image: song1nameImg.image,
      band: song1band.band,
    };
    let song2 = {
      track: data[2].song_id,
      plays: data[2].plays,
      likes: data[2].likes,
      comments: data[2].comments,
      reposts: data[2].reposts,
      name: song2nameImg.name,
      image: song2nameImg.image,
      band: song2band.band,
    };
    let songs = [song0, song1, song2];
    let strung = JSON.stringify(songs);
    let props = { tunes: songs, };
    let dehydrated = ReactDOMServer.renderToString(
      React.createElement(RelatedTracks, props)
    );
    return res.status(200).end(dehydrated);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
