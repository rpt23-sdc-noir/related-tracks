const redis = require('redis');

const client = redis.createClient('redis://52.53.162.210:6379');

client.on('error', (error) => {
  console.log(error);
});

const checkCache = (req, res, next) => {
  let { id } = req.params;
  id = parseInt(id);
  if (id < 1 || id > 10000000 || id !== id) {
    return res.status(400).end('no such track');
  }
  client.zrangebyscore('relatedtracks', id, id, (err, data) => {
    // console.log(`data len: `, data.length);
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    if (data.length !== 1) {
      next();
    } else {
      res.send(data[0]);
    }
  });
};

module.exports = {
  checkCache,
  client,
};
