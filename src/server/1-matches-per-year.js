const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

//Number of matches played per year for all the years in IPL
function getTotalMatchesPlayedByYear() {
  const result = matchesData.reduce((acc, curr) => {
    if (!acc[curr["season"]] && curr["season"] != undefined) {
      acc[curr["season"]] = 1;
    } else if (curr["season"]) {
      acc[curr["season"]] += 1;
    }
    return acc;
  }, {});

  return result;
}

outputToJson(
  "../public/output/matchesPerYear.json",
  getTotalMatchesPlayedByYear()
);

// console.log(getTotalMatchesPlayedByYear());

module.exports = getTotalMatchesPlayedByYear;
