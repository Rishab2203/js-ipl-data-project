const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");
//Top 10 economical bowlers in the year 2015

const matchesData = csvToJson("../data/matches.csv");
const deliveriesData = csvToJson("../data/deliveries.csv");

function getTopEconomicBowlersByYear(year) {
  const matchesByYear = matchesData.filter((match) => match.season == year);

  const allMatchesIdByYear = matchesByYear.reduce((acc, match) => {
    acc.push(match.id);
    return acc;
  }, []);

  const deliveriesByYear = deliveriesData.filter((delivery) =>
    allMatchesIdByYear.includes(delivery["match_id"])
  );
  const runsAndDeliveries = deliveriesByYear.reduce((acc, delivery) => {
    let runs = parseInt(delivery["batsman_runs"]);
    if (!acc[delivery["bowler"]]) {
      acc[delivery["bowler"]] = { total_runs_given: runs, total_deliveries: 1 };
    } else {
      acc[delivery["bowler"]]["total_runs_given"] += runs;
      acc[delivery["bowler"]]["total_deliveries"]++;
    }
    return acc;
  }, {});

  const totalRunsAndDeliveries = Object.entries(runsAndDeliveries);
  let economies = totalRunsAndDeliveries.reduce((acc, bowler) => {
    let [bowler_name, runs_deliveries] = bowler;
    let economy =
      runs_deliveries["total_runs_given"] / runs_deliveries["total_deliveries"];
    acc = { ...acc, [bowler_name]: economy };
    return acc;
  }, {});

  economies = Object.entries(economies).sort((a, b) => a[1] - b[1]);
  return economies.slice(0, 11);
}

outputToJson(
  "../public/output/top-economic-bowler-byYear.json",
  getTopEconomicBowlersByYear(2015)
);

module.exports = getTopEconomicBowlersByYear;
// console.log(getTopEconomicBowlersByYear(2015));
