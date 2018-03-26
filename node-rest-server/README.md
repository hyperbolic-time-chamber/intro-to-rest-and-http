# Node REST Server

## Overview

## Prerequisite Technologies
- [Node.js version 8.10.0 (LTS)](https://nodejs.org/en/download/)
- [npm version 5.6.0](https://docs.npmjs.com/) (comes installed with Node)
- [Postman](https://www.getpostman.com/)

Note that we will not be using a web application framework for this exercise i.e. you are to implement this API without express.js, hapi.js, koa.js, etc.

#### Postman

## API Specification

Expose the following endpoints and respond to requests according to the result column listed below.

| URL                            |  HTTP Verb  | Request Body | Result                                                                                    |
|:------------------------------:|:-----------:|:------------:|:-----------------------------------------------------------------------------------------:|
| /api/locations/cities          |   GET       |    empty     | Respond with JSON of all cities stored in the server.                                     |
| /api/locations/cities          |   POST      |    JSON      | Create a new city and respond with JSON of the created city.                              |
| /api/locations/cities/:id      |   PUT       |    JSON      | Update the city with matching `id` and respond with JSON of the updated city.             |
| /api/locations/cities/:id      |   DELETE    |    empty     | Delete the city with matching `id` and respond with JSON of the deleted city.             |
| /api/locations/restaurants     |   GET       |    empty     | Respond with JSON of all restaurants stored in the server.                                |
| /api/locations/restaurants     |   POST      |    JSON      | Create a new restaurant and respond with JSON of the created restaurant.                  |
| /api/locations/restaurants/:id |   PUT       |    JSON      | Update the restaurant with matching `id` and respond with JSON of the updated restaurant. |
| /api/locations/restaurants/:id |   DELETE    |    empty     | Delete the restaurant with matching `id` and respond with JSON of the deleted restaurant. |

Prioritize respoding to `GET` and `POST` requests for each endpoint. Once these are completed, work on responding to `PUT` and `DELETE` requests.

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
]
```

As shown above, each city object must contain the following properties:
  - id
  - name
  - country
  - population

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
  - id
  - name
  - city
  - price_level
  - type_of_food
  - rating

## Node.js

#### Basics

#### Helpful Resources

[http module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)

[url module](https://nodejs.org/dist/latest-v8.x/docs/api/url.html)

[path module](https://nodejs.org/dist/latest-v8.x/docs/api/path.html)

## NPM