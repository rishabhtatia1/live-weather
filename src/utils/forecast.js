const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c2bde508daa6a253617fa8cae77fdb9c&query=${latitude},${longitude}&units=f`;
  request({ url: url, json: true }, (error, response) => {
    const data = response.body;
    if (error) {
      callback("Unable to connect to the weather service!");
    } else if (data?.error) {
      callback("Unable to find location!");
    } else {
      callback(
        undefined,
        `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} fahrenheit out. There is a ${data.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
