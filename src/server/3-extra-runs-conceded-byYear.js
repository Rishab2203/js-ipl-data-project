//Extra runs conceded per team in the year 2016
const fs = require("fs");
const csvToJson = require("./index.js");

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

  //   console.log(allMatchesIdByYear);

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

fs.writeFile(
  "../public/output/extra-runs-conceded-byYear.json",
  JSON.stringify(getExtraRunsConcededByYear(2016), null, 2),
  (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("file created");
  }
);

console.log(getExtraRunsConcededByYear(2016));
