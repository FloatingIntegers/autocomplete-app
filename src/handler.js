const fs = require('fs');
const getQueryParams = require('./get-query-params');
const getMatchingWords = require('./word-search/get-matching-words');

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
  } else if (url.includes('public') || url.includes('frontendTest')) {
    const regExMatch = /\.(\w+)$/.exec(url);
    const ext = regExMatch !== null ? regExMatch[1] : 'plain';
    fs.readFile(`${__dirname}/..${url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': `text/${ext}` });
        res.end(data);
      }
    });
  } else if (url.includes('api/words')) {
    const queryObj = getQueryParams(url);
    res.writeHead(200, { 'Content-type': 'text/plain' });
    getMatchingWords(queryObj.match, queryObj.max).pipe(res);
  } else {
    res.writeHead(404);
    res.end('<h2>404 File not found</h2>');
  }
}

module.exports = handler;
