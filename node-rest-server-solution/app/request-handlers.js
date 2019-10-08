var helpers = require('./helpers');

var cityCount = 0;
var restaurantCount = 0;

var cities = [];
var restaurants = [];

var cityActions = {
  GET: function(request, response) {
    helpers.sendResponse(response, { data: cities });
  },

  POST: function(request, response) {
    helpers.collectData(request, function(city) {
      cityCount += 1;
      city.id = cityCount;
      cities.push(city);
      helpers.sendResponse(response, city, 201);
    });
  },
};

var restaurantActions = {
  GET: function(request, response) {
    helpers.sendResponse(response, { data: restaurants });
  },

  POST: function(request, response) {
    helpers.collectData(request, function(restaurant) {
      var isValidRequest = helpers.checkRestaurantSubmission(restaurant);
      console.log(isValidRequest);
      if (isValidRequest) {
        restaurantCount += 1;
        restaurant.id = restaurantCount;
        restaurants.push(restaurant);
        helpers.sendResponse(response, restaurant, 201);
      } else {
        helpers.sendResponse(
          response,
          'Bad Request: Submitted restaurant information is incomplete.',
          400
        );
      }
    });
  },
};

module.exports = {
  cities: helpers.createActionHandler(cityActions),
  restaurants: helpers.createActionHandler(restaurantActions),
};
