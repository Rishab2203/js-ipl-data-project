//Extra runs conceded per team in the year 2016
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");
const matchesData = csvToJson("../data/matches.csv");

function getExtraRunsConcededByYear(year) {
  let matchesByYear = matchesData.filter(
    (delivery) => delivery["season"] == year
  );
  let allMatchesIdByYear = matchesByYear.reduce((acc, match) => {
    acc.push(match.id);
    return acc;
  }, []);

  const result = deliveriesData
    .filter((delivery) => {
      return allMatchesIdByYear.includes(delivery["match_id"]);
    })
    .reduce((acc, delivery) => {
      let extra_runs = parseInt(delivery["extra_runs"]);

      if (!acc[delivery["bowling_team"]]) {
        acc[delivery["bowling_team"]] = extra_runs;
      } else {
        acc[delivery["bowling_team"]] += extra_runs;
      }
      return acc;
    }, {});
  return result;
}

outputToJson(
  "../public/output/extra-runs-conceded-byYear.json",
  getExtraRunsConcededByYear
);

module.exports = getExtraRunsConcededByYear;

// console.log(getExtraRunsConcededByYear(2016));
