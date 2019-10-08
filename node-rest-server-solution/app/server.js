var http = require('http');
var url = require('url');

var helpers = require('./helpers');
var requestHandlers = require('./request-handlers');

var PORT = 1337;
var IP = '127.0.0.1';

var router = {
  '/api/locations/cities': requestHandlers.cities,
  '/api/locations/restaurants': requestHandlers.restaurants,
};

var server = http.createServer(function(request, response) {
  console.log('Serving ' + request.method + ' request to ' + request.url);

  var route = router[url.parse(request.url).pathname];
  if (route) {
    route(request, response);
  } else {
    helpers.sendResponse(response, '', 404);
  }
});

console.log('Listening on http://' + IP + ':' + PORT);
server.listen(PORT, IP);
