const fs = require('fs');
const getQueryParams = require('./get-query-params');

function handler(req, res) {
  const url = req.url;
  if (url === '/') {
    fs.readFile(`${__dirname}/../public/index.html`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);
      }
    });
  } else if (url.includes('api/words')) {
    const queryObj = getQueryParams(url);
    console.log(queryObj);
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('blue\nbrown\ngreen');
  } else if (url.includes('public')) {
    const ext = url.split('.')[1];
    fs.readFile(`${__dirname}/..${url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': `text/${ext}` });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('<h2>404 File not found</h2>');
  }
}

module.exports = handler;
