# Node REST Server

## Table of Contents

## Overview

## Prerequisite Technologies

* [Node.js version 8.10.0 (LTS)](https://nodejs.org/en/download/)
* [npm version 5.6.0](https://docs.npmjs.com/) (comes installed with Node)
* [Postman](https://www.getpostman.com/)

Note that we will not be using a web application framework for this exercise i.e. you are to implement this API without express.js, hapi.js, koa.js, etc.

#### Postman

## API Specification

Expose the following endpoints and respond to requests according to the result column listed below.

|              URL               | HTTP Verb | Request Body |                                          Result                                           |
| :----------------------------: | :-------: | :----------: | :---------------------------------------------------------------------------------------: |
|     /api/locations/cities      |    GET    |    empty     |                   Respond with JSON of all cities stored in the server.                   |
|     /api/locations/cities      |   POST    |     JSON     |               Create a new city and respond with JSON of the created city.                |
|   /api/locations/cities/:id    |    PUT    |     JSON     |       Update the city with matching `id` and respond with JSON of the updated city.       |
|   /api/locations/cities/:id    |  DELETE   |     JSON     |       Delete the city with matching `id` and respond with JSON of the deleted city.       |
|   /api/locations/restaurants   |    GET    |    empty     |                Respond with JSON of all restaurants stored in the server.                 |
|   /api/locations/restaurants   |   POST    |     JSON     |         Create a new restaurant and respond with JSON of the created restaurant.          |
| /api/locations/restaurants/:id |    PUT    |     JSON     | Update the restaurant with matching `id` and respond with JSON of the updated restaurant. |
| /api/locations/restaurants/:id |  DELETE   |     JSON     | Delete the restaurant with matching `id` and respond with JSON of the deleted restaurant. |

Prioritize responding to `GET` and `POST` requests for each endpoint. Once these are complete, work on responding to `PUT` and `DELETE` requests.

Example Request

```javascript
fetch('http://localhost:3000/api/locations/city', {
  method: 'GET',
});
```

Example Response

```javascript
[
  {
    id: 1,
    name: 'Los Angeles',
    country: 'United States of America',
    population: 3976000,
  },
  {
    id: 2,
    name: 'Berlin',
    country: 'Germany',
    population: 3500000,
  },
  {
    id: 3,
    name: 'Buenos Aires',
    country: 'Argentina',
    population: 2891000,
  },
];
```

As shown above, each city object must contain the following properties:

* id
* name
* country
* population

Example Request

```javascript
fetch('http://localhost:3000/api/locations/restaurant', {
  method: 'POST',
  body: JSON.stringify({
    id: 1,
    name: 'Buffalo Wild Wings',
    city: 'Los Angeles',
    price_level: '$',
    type_of_food: 'American',
    rating: 3,
  }),
});
```

Example Response

```javascript
{
  id: 1,
  name: 'Buffalo Wild Wings',
  city: 'Los Angeles',
  price_level: '$',
  type_of_food: 'American',
  rating: 3,
}
```

As shown above, each restaurant object must contain the following properties:

* id
* name
* city
* price_level
* type_of_food
* rating

## Node.js

#### What is it?

#### What does http://localhost:3000 mean?

#### Node.js Basics

Although it's possible to put all of our program logic in one big monolithic file, this is an anti-pattern we want to avoid in order to keep our codebase maintainable.

Fortunately, Node.js exposes an interface for requiring and exporting logic between files.

Specifically, we use `require` statements to import functions or properties from other files. We use `module.exports` statements to expose functions or properties that can then be used by other files.

We pass to the `require` statement a path to the file from which we are looking to import functions/properties. The path is relative to the file where we use the `require` statement.

For example, given a directory structure that looks like this:

```
├── app
│   ├── helpers
│   │   ├── utils.js
|   ├── models
│   │   ├── car.js
│   └── app.js
├── node_modules
├── README.md
├── package.json
├── sample-data.json
└── .gitignore
```

Example require statements:

```javascript
// app.js
var jsonData = require('../sample-data.json');
var helpers = require('./helpers/utils');
var car = require('./models/car');
```

Additional examples of `require` statements and how to use `module.exports` to import what is exported from a file:

```javascript
// arithmetic.js

var add = function(x, y) {
  return x + y;
};

var subtract = function(x, y) {
  return x - y;
};

var mutiply = function(x, y) {
  return x * y;
};

module.exports = {
  add: add,
  subract: subract,
  multiply: multiply,
};
```

```javascript
// app.js

var math = require('./arithmetic');

var sum = math.add(10, 15);
console.log(sum); // 25

var difference = math.subtract(10, 15);
console.log(difference); // -5

var product = math.multiply(10, 15);
console.log(product); // 150
```

```javascript
// divide.js

module.exports = function(x, y) {
  return x / y;
};
```

```javascript
// app.js

var divide = require('./divide');

var quotient = divide(10, 15);
console.log(quotient); // 0.66666666666
```

Making use of libraries installed via npm works very similarly, the difference is in what you pass to the `require` statement. Whereas we pass a relative path when requiring our source code, we simply pass the name of the library when requiring an npm package. When you pass a name, without any `\` indicating a path, then the Node.js runtime knows to look into the `node_modules` directory to find the package.

Example:

```javascript
// app.js

var request = require('request');

request('http://www.google.com', function(error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// source: https://www.npmjs.com/package/request
```

Note that the request library would need to be installed via the terminal command `npm install request`.

Node.js also comes with built-in modules that don't require any installation. Here are a few modules you'll want to get familiar with for both this exercise and any future work with Node:

* [http module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
* [url module](https://nodejs.org/dist/latest-v8.x/docs/api/url.html)
* [path module](https://nodejs.org/dist/latest-v8.x/docs/api/path.html)

Example:

```javascript
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
});

server.listen(1337, '127.0.0.1');
```

<!-- #### Helpful Resources

[http module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)

[url module](https://nodejs.org/dist/latest-v8.x/docs/api/url.html)

[path module](https://nodejs.org/dist/latest-v8.x/docs/api/path.html) -->

## NPM
