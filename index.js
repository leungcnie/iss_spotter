// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// SPOTTER I
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// SPOTTER II
// fetchCoordsByIP("205.250.191.71", (err, data) => {
//   console.log(err);
//   console.log(data);
// })

// SPOTTER III
// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// const invalidCoords = { latitude: "scream", longitude: "10000"};
// fetchISSFlyOverTimes(invalidCoords, (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// })