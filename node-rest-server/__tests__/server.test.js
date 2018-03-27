var request = require('request');

describe('My RESTful API', () => {
  const CITY_ENDPOINT = 'http://localhost:1337/api/locations/cities';
  const RESTAURANT_ENDPOINT = 'http://localhost:1337/api/locations/restaurants';

  test('should respond to requests to /api/locations/cities with stringified JSON.', () => {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(() => JSON.parse(body)).not.toThrow();
    });
  });

  test('should respond to requests to /api/locations/restaurants with stringified JSON.', () => {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(() => JSON.parse(body)).not.toThrow();
    });
  });

  test('should respond to requests to /api/locations/cities with a parsable stringified object.', () => {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(typeof JSON.parse(body)).toBe('object');
    });
  });

  test('should respond to requests to /api/locations/restaurants with a parsable stringified object.', () => {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(typeof JSON.parse(body)).toBe('object');
    });
  });

  test('should respond to GET requests to /api/locations/cities with a 200 status code.', () => {
    request(CITY_ENDPOINT, function(error, response, body) {
      expect(response.statusCode).toBe(200);
    });
  });

  test('should respond to GET requests to /api/locations/cities with an object containing a `data` array of all the cities.', () => {
    request(CITY_ENDPOINT, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(
        Array.isArray(parsedBody.data) &&
          response.request.path === '/api/locations/cities',
      ).toBe(true);
    });
  });

  test('should respond to POST requests to /api/locations/cities with a 201 status code.', () => {
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

  test('should respond to POST requests to /api/locations/cities with the city object that was created.', () => {
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

  // test('should respond to PUT requests to /api/locations/cities with a 200 status code.', () => {});
  // test('should respond to PUT requests to /api/locations/cities with the city object that was updated.', () => {});
  // test('should respond to DELETE requests to /api/locations/cities with a 200 status code.', () => {});
  // test('should respond to DELETE requests to /api/locations/cities with the city object that was deleted.', () => {});

  test('should respond to GET requests to /api/locations/restaurants with a 200 status code.', () => {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      expect(response.statusCode).toBe(200);
    });
  });

  test('should respond to GET requests to /api/locations/restaurants with an object containing a `data` array of all the restaurants.', () => {
    request(RESTAURANT_ENDPOINT, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(
        Array.isArray(parsedBody.data) &&
          response.request.path === '/api/locations/restaurants',
      ).toBe(true);
    });
  });

  // test('should respond to POST requests to /api/locations/restaurants with a 201 status code if sending a restaurant object that contains all required properties.', () => {});
  // test('should respond to POST requests to /api/locations/restaurants with a 400 status code if sending a restaurant object that DOES NOT contain all required properties.', () => {});
  // test('should respond to POST requests to /api/locations/restaurants with the restaurant object that was created.', () => {});
  // test('should respond to PUT requests to /api/locations/restaurants with a 200 status code.', () => {});
  // test('should respond to PUT requests to /api/locations/restaurants with the restaurant object that was updated.', () => {});
  // test('should respond to DELETE requests to /api/locations/restaurants with a 200 status code.', () => {});
  // test('should respond to DELETE requests to /api/locations/restaurants with the restaurant object that was deleted.', () => {});
});
