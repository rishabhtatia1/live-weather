const request = require("request");
const geoCodeData = (address, callback) => {
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmlzaGFiaDIxIiwiYSI6ImNrbnlzd3NyaTBpbm8yd28wbjg4dTBjbHMifQ.eVpPSHBqgvpslcjP0hdmwg&limit=1`;
  request({ url: geoCodeUrl, json: true }, (error, response) => {
    const data = response?.body;
    if (error) {
      callback("Unable to connect to the weather service!");
    } else if (data?.features?.length === 0) {
      callback("Unable to find location. Try another search!");
    } else {
      const latitude = data?.features[0]?.center[1];
      const longitude = data?.features[0]?.center[0];
      callback(undefined, { latitude, longitude, location: data?.features[0].place_name });
    }
  });
};
module.exports = geoCodeData;
