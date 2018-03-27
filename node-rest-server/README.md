# Node REST Server

## Table of Contents

1.  [Overview](#overview)
1.  [Setup](#setup)
1.  [Prerequisite Technologies](#prerequisite-technologies)
1.  [Postman](#postman)
1.  [API Specification](#api-specification)
1.  [Node.js](#nodejs)
1.  [What is it?](#what-is-it)
1.  [npm](#npm)
1.  [Node.js Basics](#nodejs-basics)
1.  [How to Create a Server](#how-to-create-a-server)

## Overview

_[Back to Top](#table-of-contents)_

We are going to build a RESTful API using Node.js.

Our RESTful API will expose an interface that allows us to retrieve, send, modify, and delete data related to restaurants and cities. See [API Specification](#api-specification) for more detailed instructions. We will be applying what we learned about REST and HTTP throughout this exercise. We will be communicating using JSON as indicated by the `Content-Type` header that's given to you as part of the starter code.

There will be no front-end for this application. You may be wondering, "how am I to use my API then?" You will use Postman to interrogate your server. See [Postman](#postman) for further explanation.

Use the tests to guide your implementation. Working through the tests in order will allow you to build up to a working implementation of this REST server.

You are encouraged to modularize your code. In particular, consider breaking up your codebase into separate files. You might have a file for your helper functions, a file for your request handlers, and file (given) for your server.

Once you have completed the exercise, take a moment to read through the README for Server-Side Concepts and REST a second time as you will likely find that you have a better understanding of the concepts discussed given that you just completed an exercise putting the concepts into practice.

#### Setup

_[Back to Top](#table-of-contents)_

Run in terminal: `npm install`
To start server using `nodemon`: `npm run start:dev`
To run tests: `npm test`

**Be sure your server is running when you run your tests. Note that not all tests have been implemented. They are a work-in-progress.**

## Prerequisite Technologies

_[Back to Top](#table-of-contents)_

* [Node.js version 8.10.0 (LTS)](https://nodejs.org/en/download/)
* [npm version 5.6.0](https://docs.npmjs.com/) (comes installed with Node)
* [Postman](https://www.getpostman.com/)

Ensure that all of the above have been downloaded/installed. Note that we will not be using a web application framework for this exercise i.e. you are to implement this API without express.js, hapi.js, koa.js, etc.

#### Postman

_[Back to Top](#table-of-contents)_

Below is a series of screenshots meant to illustrate how to use Postman.

Note that you are able to set an HTTP Action Verb, a URL, headers, and other information to be sent along with the request.

When you're ready, you can click "Send" to send the request and the response will show up in the bottom portion of the page. We've set the format of the response seen below to JSON so that we can more easily read it.

![example-get](https://gist.githubusercontent.com/kamirdjanian/8ec0aa269188c43051914b1b6084a937/raw/d023b5da85d6eb5e9b118cd7a79556761a0aa1c6/example-get-request-response.png)

In the previous example, we made a `GET` request so there wasn't a `body` to attach to the request. In this example, we are making a `POST` request, so we need to attach the information that we want to `POST` to our server to our request.

To do this, we navigate to the section titled `Body` and then we are able to input some data. Since our app is communicating in JSON we can set the data type to `raw` and then specify that we are sending JSON.

As before, the response will show up in the section below the request information.

![example-post-body](https://gist.githubusercontent.com/kamirdjanian/8ec0aa269188c43051914b1b6084a937/raw/d023b5da85d6eb5e9b118cd7a79556761a0aa1c6/example-post-body.png)

## API Specification

_[Back to Top](#table-of-contents)_

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

* id (generated server-side)
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

* id (generated server-side)
* name
* city
* price_level
* type_of_food
* rating

## Node.js

#### What is it?

_[Back to Top](#table-of-contents)_

Simply put, Node is JavaScript that runs on the server.

When we say "runs on the server" we mean runs on a computer, outside of the browser.

To illustrate further, JavaScript that runs in the browser allows you to manipulate the DOM and create the front-end of a web application.

JavaScript that runs on the server allows you to access files, write to databases, [open up ports](#how-to-create-a-server), [create servers](#how-to-create-a-server), etc.

Just as JavaScript that runs in the browser is event-driven, so too is Node. This means that we retain all of the advantages of asynchronous non-blocking event-driven code on the server.

#### npm

_[Back to Top](#table-of-contents)_

`npm` is package manager that is built into Node. It is used to manage dependencies. Although it's intuitive to assume that `npm` stands for `node package manager`, this is not the case. The foundation maintains that there is formal meaning behind the term `npm`.

One of the best features of `npm` is the ability to create scripts to automate certain tasks.

This exercise comes with a few scripts already. Take a moment to understand them.

Know that the start and test scripts can simply be run by entering `npm start` and `npm test` in the terminal, respectively. Any custom scripts that you write must include the `run` keyword e.g. `npm run lint` or `npm run build`.

`npm install` installs the dependencies listed in the `package.json`. `npm install _some-library_` installs a package. Adding the `--save-dev` flag saves it as a `devDependency`.

#### Node.js Basics

_[Back to Top](#table-of-contents)_

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

Additional examples of `require` statements and how to use `module.exports`:

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

#### How to Create a Server?

_[Back to Top](#table-of-contents)_

Let's take a deeper dive into the above example, reposted below:

```javascript
var http = require('http');

var server = http.createServer(function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World!');
  response.end();
});

server.listen(1337, '127.0.0.1');
```

The `http` module exposes a method called `createServer` that behaves as it sounds; we can use it create a server. `createServer` returns an instance of `http.Server`.

Note that we pass a callback function to `createServer` when we invoke it. This callback function is also known as a `request-handler`. As the name implies, the `request-handler` receives requests and sends responses when finished servicing a request.

How do we "turn on" the server and make it available for connections?

We invoke the listen method on the server instance.

The first argument is the `port` that we are opening up. You can think of a `port` as a literal port on the sea, where ships dock, exchange supplies, and set sail. Similarly, a `port` is a connection that a computer makes available for other computers to connect to in order to start exchanging information.

The second argument is an `ip address`. Since we are creating a server that runs locally on our computer, we need the `ip` for our `localhost`. This `ip` is `127.0.0.1`. When you see `127.0.0.1` and `localhost`, they are more or less interchangeable.

Note that within the body of the `request-handler`, we are doing some work with the response object. Specifically we are:

1.  Attaching a `statusCode` of 200 and the header `Content-Type` to our response.
1.  Writing `'Hello World!'` to the response.
1.  Indicating that we are done servicing the request and sending a response back to whichever client initiated the request.

After the last line of the code block runs, we will be able to make all sorts of requests to `http://localhost:1337`.
