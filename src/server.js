const http = require('http');
const handler = require('./src/handler.js');
const port = process.env.PORT || 4000;

<<<<<<< HEAD
function handler (req, res) {
  const url = req.url;

  if (url === '/') {
    fs.readFile(__dirname + '/..' + '/index.html', (err, data) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(data);
    });
  }
}

=======
>>>>>>> master
http.createServer(handler).listen(port);

console.log("Server is running on localhost:" + port);
