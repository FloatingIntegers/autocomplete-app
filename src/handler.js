const fs = require('fs');
const getQueryParams = require('./get-query-params');
const getMatchingWords = require('./word-search/get-matching-words');

const VALID_EXTS_TO_CONTENT_TYPES = {
  ico: 'image/x-icon',
};

function getContentTypeFromExt(ext) {
  return VALID_EXTS_TO_CONTENT_TYPES[ext] || `text/${ext}`;
}

function getFileExt(url) {
  const regExMatch = /\.(\w+)$/.exec(url);
  return regExMatch !== null ? regExMatch[1] : 'plain';
}

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
    res.writeHead(200, { 'Content-type': 'text/plain' });
    getMatchingWords(queryObj.match, queryObj.max).pipe(res);
  } else {
    const ext = getFileExt(url);
    fs.readFile(`${__dirname}/..${url}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': getContentTypeFromExt(ext) });
        res.end(data);
      }
    });
  }
}

module.exports = handler;
