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

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (err, response, body) => {
    if (err) return callback(err, null);
    
    const data = JSON.parse(body);
    if (data.status === "fail") return callback(Error(`Ruh roh! ${ip} is not a valid IP address`), null);
    
    const coordsObj = { latitude: data.lat, longitude: data.lon };
    callback(null, coordsObj);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
