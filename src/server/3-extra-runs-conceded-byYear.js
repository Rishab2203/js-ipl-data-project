//Extra runs conceded per team in the year 2016
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");
const matchesData = csvToJson("../data/matches.csv");

function getExtraRunsConcededByYear(year) {
  let allMatchesIdByYear = [];

  for (let match of matchesData) {
    if (match["season"] == year) {
      allMatchesIdByYear.push(match.id);
    }
  }

  const deliveriesByMatchId = [];
  for (let delivery of deliveriesData) {
    if (allMatchesIdByYear.includes(delivery["match_id"])) {
      deliveriesByMatchId.push(delivery);
    }
  }

  const result = {};

  for (let delivery of deliveriesByMatchId) {
    let extra_runs = parseInt(delivery["extra_runs"]);
    let bowling_team = delivery["bowling_team"];

    result[bowling_team] = (result[bowling_team] || 0) + extra_runs;
  }

  return result;
}

outputToJson(
  "../public/output/extra-runs-conceded-byYear.json",
  getExtraRunsConcededByYear(2016)
);

module.exports = getExtraRunsConcededByYear;

// console.log(getExtraRunsConcededByYear(2016));
