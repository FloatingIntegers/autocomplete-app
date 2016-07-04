const url = require('url');
const querystring = require('querystring');

function getUrlData(urlString) {
  return url.parse(urlString);
}

function getQueryParams(urlString) {
  const urlObj = getUrlData(urlString);
  return querystring.parse(urlObj.query);
}

module.exports = { getUrlData, getQueryParams };
