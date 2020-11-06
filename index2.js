const { nextISSTimesForMyLocation } = require('./iss_promised');
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((data) => {
    printPassTimes(data);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    let duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}