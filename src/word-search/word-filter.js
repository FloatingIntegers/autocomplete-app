const { Transform } = require('stream');

class WordFilter extends Transform {

  /**
   * constructor method, calls parent Transform stream
   * @param  {RegExp} filter regular expression to filter words
   * @return {WordFilter} current instance
   */
  constructor(filter) {
    super({ objectMode: true });
    this.filter = filter;
  }

  /**
   * Method required to implement a Node Transform stream
   * @param  {String}   word     Line of text read from input stream
   * @param  {undefined}   encoding Required by Node Transform but not used
   * @param  {Function} callback Supplies by Node Tranform: called when transform completed
   * @return {undefined}            CPS so no return value
   */
  _transform(word, encoding, callback) {
    if (!this.filter || this.filter.test(word)) this.push(word);
    callback();
  }
}

module.exports = WordFilter;
