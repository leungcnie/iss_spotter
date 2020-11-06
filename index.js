// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const pass of passTimes) {
    // let ms = pass.risetime * 1000; // times by 1000 to get milliseconds
    // let date = new Date(ms).toString();
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    let duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
});

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