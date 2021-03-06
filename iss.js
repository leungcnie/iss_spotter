const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err, null); // error: invalid domain, user offline, etc

    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // no problems, pass data
    const data = JSON.parse(body); // {ip: ...}
    const IP = data.ip;
    callback(null, IP);

  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (err, response, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);
    if (data.status === "fail") return callback(Error(`Ruh roh! ${ip} is not a valid IP address`), null);

    const coordsObj = { latitude: data.lat, longitude: data.lon };
    callback(null, coordsObj);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) return callback(err, null);

    if (response.statusCode !== 200) return callback(Error(`Woopsie! Status Code ${response.statusCode}`), null);

    const responseArr = JSON.parse(body).response;
    callback(null, responseArr);
  });
};

// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
    } else {
      fetchCoordsByIP(ip, (err, coords) => {
        if (err) {
          callback(err, null);
        } else {
          fetchISSFlyOverTimes(coords, (err, nextPasses) => {
            if (err) {
              callback(err, null);
            } else {
              callback(err, nextPasses);
            }
          });
        }
      });
    }
  });
};


module.exports = { nextISSTimesForMyLocation };

