const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost/tracks', {
                                                  useUnifiedTopology: true,
                                                  useNewUrlParser: true,
                                                });

const db = mongoose.connection;
db.on('error', function() {
  console.log(chalk.red('mongoose connection error'));
});
db.once('open', function() {
  console.log(chalk.green('mongoose connected'));
});

const relatedSchema = new mongoose.Schema({
  song_id: Number,
  plays: Number,
  likes: Number,
  reposts: Number,
  comments: Number,
  genre: String,
  onPlaylists: [Number],
  producedBy: String,
  likedBy: [Number],
  playedBy: [Number],
  repostedBy: [Number],
});

const Track = mongoose.model('Track', relatedSchema);

const addTrack = function(trackData, cb = () => {}) {
  let trackId = trackData.song_id;
  return findTrack(trackId, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data === null) {
      let track = new Track(trackData);
      track.save((err, track) => {
        if (err) {
          console.log(chalk.red('Problem saving track', err));
          cb(err);
        } else {
          console.log(chalk.blue(`Track ${track.song_id} saved`));
          cb(null, track);
        }
      })
    } else {
      cb(null, false);
    }
  })
};

const findTrack = function(id, cb = () => {}) {
  Track.findOne({song_id: id}, (err, track) => {
    if (err) {
      cb(err);
    } else {
      cb(null, track);
    }
  })
};

const updateTrack = function(id, replacement, cb = () => {}) {
  Track.findOneAndReplace({song_id: id}, replacement, { new: true }, (err, track) => {
    if (err) {
      cb(err);
    } else {
      console.log(track)
      cb(null, track);
    }
  });
};

const deleteTrack = function (id, cb = () => {}) {
  Track.findOneAndDelete({song_id: id}, (err, track) => {
    if (err) {
      console.log(chalk.red('Could not delete track'));
      cb(err);
    } else {
      console.log(chalk.magenta('Track deleted'));
      cb(null, track);
    }
  })
};

const drop = () => {
  mongoose.connection.dropCollection('tracks', (err, result) => {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log('tracks dropped');
      console.log(result);
    }
  });
};

const close = () => {
  mongoose.connection.close();
};


module.exports = {
  addTrack,
  findTrack,
  updateTrack,
  deleteTrack,
  drop,
  close,
}
