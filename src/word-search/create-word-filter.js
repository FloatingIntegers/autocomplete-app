const WordFilter = require('./word-filter');

function createWordFilter(fragment) {
  const regex = new RegExp(`^${fragment}`);
  return new WordFilter(regex);
}

module.exports = createWordFilter;
