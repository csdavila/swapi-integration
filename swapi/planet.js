const axios = require("axios");

module.exports.get = async (event, context, callback) => {
  axios
    .get(`https://swapi.py4e.com/api/planets/${event.pathParameters.id}`)
    .then(
      (response) => {
        console.log(response.data);
        const responseBody = {
          statusCode: 200,
          body: JSON.stringify(response.data),
        };
        callback(null, responseBody);
      },
      (error) => {
        console.log(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body: "Couldn't fetch the planet.",
        });
        return;
      }
    );

  //   import fetch from "node-fetch";

  //   try {
  //     let res = await fetch(
  //       `https://swapi.py4e.com/api/planets/${event.pathParameters.id}`
  //     );
  //     let data = await res.json();
  //     // return data;
  //     const response = {
  //       statusCode: 200,
  //       body: JSON.stringify(data),
  //     };
  //     callback(null, response);
  //   } catch (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: { "Content-Type": "text/plain" },
  //       body: "Couldn't fetch the planet.",
  //     });
  //     return;
  //   }
};
