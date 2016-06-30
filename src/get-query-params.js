const url = require('url');
const querystring = require('querystring');

function getQueryParams(urlString) {
  const urlObj = url.parse(urlString);
  return querystring.parse(urlObj.query);
}

module.exports = getQueryParams;
