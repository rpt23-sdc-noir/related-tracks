// require('newrelic');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const expressStaticGzip = require('express-static-gzip');
const app = express();
const tracks = require('./routes/tracks.js');

const port = 3001;

app.use(parser.json());
app.use(morgan('dev'));
app.use('/relatedTracks', tracks);

// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressStaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}));

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
