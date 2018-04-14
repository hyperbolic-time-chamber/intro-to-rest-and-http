var request = require('request');

describe('My RESTful API', function() {
  const CITY_ENDPOINT = 'http://localhost:1337/api/locations/cities';
  const RESTAURANT_ENDPOINT = 'http://localhost:1337/api/locations/restaurants';

  test('should respond to requests to /api/locations/cities with stringified JSON.', function() {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(function() {
        JSON.parse(body).not.toThrow();
      });
    });
  });

  test('should respond to requests to /api/locations/restaurants with stringified JSON.', function() {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(function() {
        JSON.parse(body).not.toThrow();
      });
    });
  });

  test('should respond to requests to /api/locations/cities with a parsable stringified object.', function() {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(typeof JSON.parse(body)).toBe('object');
    });
  });

  test('should respond to requests to /api/locations/restaurants with a parsable stringified object.', function() {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(typeof JSON.parse(body)).toBe('object');
    });
  });

  test('should respond to GET requests to /api/locations/cities with a 200 status code.', function() {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(response.statusCode).toBe(200);
    });
  });

  test('should respond to GET requests to /api/locations/cities with an object containing a `data` array of all the cities.', function() {
    request(CITY_ENDPOINT, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(
        Array.isArray(parsedBody.data) &&
          response.request.path === '/api/locations/cities',
      ).toBe(true);
    });
  });

  test('should respond to POST requests to /api/locations/cities with a 201 status code.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Los Angeles',
        country: 'United States of America',
        population: 3976000,
      },
      json: true,
      uri: CITY_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(response.statusCode).toBe(201);
    });
  });

  test('should respond to POST requests to /api/locations/cities with the city object that was created.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Berlin',
        country: 'Germany',
        population: 3500000,
      },
      json: true,
      uri: CITY_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(body.name).toBe('Berlin');
      expect(body.country).toBe('Germany');
      expect(body.population).toBe(3500000);
    });
  });

  test('should respond to GET requests to /api/locations/restaurants with a 200 status code.', function() {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(response.statusCode).toBe(200);
    });
  });

  test('should respond to GET requests to /api/locations/restaurants with an object containing a `data` array of all the restaurants.', function() {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(
        Array.isArray(parsedBody.data) &&
          response.request.path === '/api/locations/restaurants',
      ).toBe(true);
    });
  });

  test('should respond to POST requests to /api/locations/restaurants with a 201 status code if sending a restaurant object that contains all required properties.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Buffalo Wild Wings',
        city: 'Los Angeles',
        price_level: '$',
        type_of_food: 'American',
        rating: 3,
      },
      json: true,
      uri: RESTAURANT_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(response.statusCode).toBe(201);
    });
  });

  test('should respond to POST requests to /api/locations/restaurants with a 400 status code if sending a restaurant object that DOES NOT contain all required properties.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Buffalo Wild Wings',
        city: 'Los Angeles',
        type_of_food: 'American',
        rating: 3,
      },
      json: true,
      uri: RESTAURANT_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(response.statusCode).toBe(400);
    });
  });

  test('should respond to POST requests to /api/locations/restaurants with an error message if sending a restaurant object that DOES NOT contain all required properties.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Buffalo Wild Wings',
        city: 'Los Angeles',
        type_of_food: 'American',
        rating: 3,
      },
      json: true,
      uri: RESTAURANT_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(body).toBe(
        'Bad Request: Submitted restaurant information is incomplete.',
      );
    });
  });

  test('should respond to POST requests to /api/locations/restaurants with the restaurant object that was created.', function() {
    var options = {
      method: 'POST',
      body: {
        name: 'Kabuki',
        city: 'Los Angeles',
        price_level: '$$',
        type_of_food: 'Sushi',
        rating: 4,
      },
      json: true,
      uri: RESTAURANT_ENDPOINT,
    };
    request(options, function(error, response, body) {
      expect(body.name).toBe('Kabuki');
      expect(body.city).toBe('Los Angeles');
      expect(body.price_level).toBe('$$');
      expect(body.type_of_food).toBe('Sushi');
      expect(body.rating).toBe(4);
    });
  });
});
