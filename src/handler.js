const fs = require('fs');
const getQueryParams = require('./get-query-params');


function handler(req, res) {
  if (req.url === '/') {
    fs.readFile(`${__dirname}/../public/index.html`, (err, data) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(data);
    });
  } else if (req.url.includes('api/words')) {
    console.log(getQueryParams(req.url));
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('blue\nbrown\ngreen');
  } else if (req.url.includes('public')) {
    const ext = req.url.split('.')[1];
    fs.readFile(`${__dirname}/..${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      }
      res.writeHead(200, { 'Content-type': `text/${ext}` });
      res.end(data);
    });
  } else {
    fs.readFile(__dirname + req.url, (err) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      }
    });
  }
}

module.exports = handler;
