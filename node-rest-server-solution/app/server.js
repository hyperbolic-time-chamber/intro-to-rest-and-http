const http = require('http');
const url = require('url');

const helpers =  require('./helpers');
const requestHandlers = require('./request-handlers');
 
const PORT = 1337;
const IP = '127.0.0.1';

const router = {
  '/api/locations/cities': requestHandlers.cities,
  '/api/locations/restaurants': requestHandlers.restaurants,
};

const server = http.createServer((request, response)=> {
  console.log(`Serving ${request.method} request to ${request.url}`);
  const route = router[url.parse(request.url).pathname];
  if (route) {
    route(request, response);
  } else {
    helpers.sendResponse(response, '', 404);
  }
});
console.log(`Listening on http:// ${IP}${':'}${PORT}`);
server.listen(PORT, IP);
