const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/about-us',
  'http://localhost:3000/admissions',
  'http://localhost:3000/contact',
  'http://localhost:3000/fee-structure',
  'http://localhost:3000/registrations',
  'http://localhost:3000/curriculum',
  'http://localhost:3000/careers',
  'http://localhost:3000/activities',
  'http://localhost:3000/events',
  'http://localhost:3000/virtual-tour',
  'http://localhost:3000/pre-nursery',
  'http://localhost:3000/1-a',
  'http://localhost:3000/6-c',
  'http://localhost:3000/ace'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`Status ${res.statusCode} for ${url}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`Error on ${url}:`, err.message);
      resolve(500);
    });
  });
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
  }
}

run();
