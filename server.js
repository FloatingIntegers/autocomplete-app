const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 4000;

function handler(req, res) {
  const url = req.url;

  if (url === '/') {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(data);
    });
  }
}

http.createServer(handler).listen(port);

console.log("Server is running on localhost:" + port);
