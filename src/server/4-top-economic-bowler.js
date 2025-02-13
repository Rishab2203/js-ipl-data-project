const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");
//Top 10 economical bowlers in the year 2015

const matchesData = csvToJson("../data/matches.csv");
const deliveriesData = csvToJson("../data/deliveries.csv");

function getTopEconomicBowlersByYear(year) {
  let allMatchesIdByYear = [];

  for (let match of matchesData) {
    if (match["season"] == year) {
      allMatchesIdByYear.push(match.id);
    }
  }

  const deliveriesByYear = [];
  for (let delivery of deliveriesData) {
    if (allMatchesIdByYear.includes(delivery["match_id"])) {
      deliveriesByYear.push(delivery);
    }
  }

  const runsAndDeliveries = {};

  for (let delivery of deliveriesByYear) {
    let bowler = delivery["bowler"];
    let runs = parseInt(delivery["batsman_runs"]);

    if (!runsAndDeliveries[bowler]) {
      runsAndDeliveries[bowler] = {};
    }
    runsAndDeliveries[bowler]["total_runs_given"] =
      (runsAndDeliveries[bowler]["total_runs_given"] || 0) + runs;
    runsAndDeliveries[bowler]["total_deliveries"] =
      (runsAndDeliveries[bowler]["total_deliveries"] || 0) + 1;
  }

  const totalRunsAndDeliveries = Object.entries(runsAndDeliveries);

  let economies = {};
  for (let [bowler_name, runs_deliveries] of totalRunsAndDeliveries) {
    let economy =
      runs_deliveries["total_runs_given"] / runs_deliveries["total_deliveries"];
    economies[bowler_name] = economy;
  }

  economies = Object.entries(economies).sort((a, b) => a[1] - b[1]);
  return economies.slice(0, 11);
}

outputToJson(
  "../public/output/top-economic-bowler-byYear.json",
  getTopEconomicBowlersByYear(2015)
);

module.exports = getTopEconomicBowlersByYear;
// console.log(getTopEconomicBowlersByYear(2015));
