const fs = require('fs');

function handler(req, res) {
  const url = req.url;

  if (url === '/') {
    fs.readFile(__dirname + '/..' + '/index.html', (err, data) => {
      if (err){
          throw err;
      }
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(data);
    });
} else {
        fs.readFile(__dirname + url, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('<h2>404 File not found</h2>');
        }
      });
    }
}


module.exports = handler;
