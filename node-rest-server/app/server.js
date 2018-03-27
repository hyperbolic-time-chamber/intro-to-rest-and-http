var http = require('http');

var PORT = 1337;
var IP = '127.0.0.1';

var headers = {
  'Content-Type': 'application/json',
};

var statusCode = 200;

var server = http.createServer(function(request, response) {
  console.log('Serving ' + request.method + ' request to url: ' + request.url);
  response.writeHead(statusCode, headers);
  response.end('Hello, World!');
});

console.log('Listening on http://' + IP + ':' + PORT);
server.listen(PORT, IP);
