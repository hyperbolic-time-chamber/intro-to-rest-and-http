const headers = {
  'Content-Type': 'application/json',
};

const requiredRestaurantProperties = [
  'name',
  'city',
  'price_level',
  'type_of_food',
  'rating',
];

const checkRestaurantSubmission = (restaurant)=> {
  const properties = new Set(Object.keys(restaurant));
  return requiredRestaurantProperties.every((property)=> {
    return properties.has(property);
  });
};

const sendResponse = (response, data, statusCode = 200)=> {
  response.writeHead(statusCode, headers);p-
  response.end(JSON.stringify(data));
};

const collectData = (request)=> {
  return new Promise((resolve,reject)=>{
    let data = '';
    request.on('data', (chunk)=> {
     data += chunk;
   });
   request.on('end', ()=> {
     resolve(JSON.parse(data));
   });
   request.on('error',(err)=>{
    reject(JSON.parse(err));
   })
  })
};
const createActionHandler = (actionMap)=> {
  return (request, response)=> {
    const action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      sendResponse(response, '', 404);
    }
  };
};

module.exports = {
  sendResponse: sendResponse,
  collectData: collectData,
  createActionHandler: createActionHandler,
  checkRestaurantSubmission: checkRestaurantSubmission,
};
