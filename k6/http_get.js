import http from 'k6/http';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');

export let options = {
  stages: [
    // { duration: '10s', target: 10 },
    // { duration: '45s', target: 100 },
    // { duration: '60s', target: 1000 },
    // { duration: '60s', target: 1000 },
    { duration: '5s', target: 1 },
    { duration: '10s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '60s', target: 550 },
    { duration: '60s', target: 1000 },
    { duration: '60s', target: 1000 },
  ],
  thresholds: {
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  }
};

export default () => {
  let res = http.get(`http://localhost:3001/relatedTracks/${9999000 + Math.floor(Math.random() * 1000)}`);
  myFailRate.add(res.status !== 200);
  // let res2 = http.get(`http://localhost:3001/relatedTracks/${9000000 + Math.floor(Math.random() * 1000000)}`);
  // myFailRate.add(res2.status !== 200);
  let res2 = http.get(`http://localhost:3001/relatedTracks/100`);
  myFailRate.add(res2.status !== 200);
};
