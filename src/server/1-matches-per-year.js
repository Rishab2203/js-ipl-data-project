const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

//Number of matches played per year for all the years in IPL
function getTotalMatchesPlayedByYear() {
  let result = {};

  for (let match of matchesData) {
    let season = match["season"];

    result[season] = (result[season] || 0) + 1;
  }

  return result;
}

outputToJson(
  "../public/output/matchesPerYear.json",
  getTotalMatchesPlayedByYear()
);

console.log(getTotalMatchesPlayedByYear());

module.exports = getTotalMatchesPlayedByYear;
