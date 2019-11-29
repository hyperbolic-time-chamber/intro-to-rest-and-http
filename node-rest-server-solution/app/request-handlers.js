const helpers = require('./helpers');

let cityCount = 0;
let restaurantCount = 0;

let cities = [];
let restaurants = [];

const cityActions = {
  GET: (request, response)=> {
    helpers.sendResponse(response, { data: cities });
  },

  POST: async(request, response)=> {
    try {
       await helpers.collectData(request);
      cityCount += 1;
      city.id = cityCount;
      cities.push(city);
      helpers.sendResponse(response, city, 201);
    } catch (error) {
      
    }
  }
};

const restaurantActions = {
  GET: (request, response)=> {
    helpers.sendResponse(response, { data: restaurants });
  },

  POST: (request, response)=> {
    helpers.collectData(request, (restaurant)=> {
      const isValidRequest = helpers.checkRestaurantSubmission(restaurant);
      if (isValidRequest) {
        restaurantCount += 1;
        restaurant.id = restaurantCount;
        restaurants.push(restaurant);
        helpers.sendResponse(response, restaurant, 201);
      } else {
        helpers.sendResponse(
          response,
          `Bad Request: Submitted restaurant information is incomplete.`,
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
