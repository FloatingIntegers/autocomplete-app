const fs = require('fs');
const getQueryParams = require('./get-query-params');
const getMatchingWords = require('./word-search/get-matching-words');

function handler(req, res) {
  const url = req.url;

  if (url.includes('frontendTest')) {
    fs.readFile(`${__dirname}/..${url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      } else {
        res.end(data);
      }
    });
  } else if (url === '/') {
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
    res.writeHead(200, { 'Content-type': 'text/plain' });
    getMatchingWords(queryObj.match, queryObj.max).pipe(res);
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
