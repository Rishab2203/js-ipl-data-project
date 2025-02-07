const fs = require("fs");
const csvToJson = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

//Number of matches played per year for all the years in IPL
function getTotalMatchesPlayedByYear() {
  const result = matchesData.reduce((acc, curr) => {
    if (!acc[curr["season"]] && curr["season"] != undefined) {
      acc[curr["season"]] = 1;
    } else if (curr["season"]) {
      acc[curr["season"]]++;
    }
    return acc;
  }, {});

  return result;
}

fs.writeFile(
  "../public/output/matchesPerYear.json",
  JSON.stringify(getTotalMatchesPlayedByYear(), null, 2),
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Json created");
  }
);
// console.log(getTotalMatchesPlayedByYear());

module.exports = getTotalMatchesPlayedByYear;
