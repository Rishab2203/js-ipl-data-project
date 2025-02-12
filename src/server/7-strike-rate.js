//Find the strike rate of a batsman for each season.
const { csvToJson, outputToJson } = require("./index.js");
const fs = require("fs");

const deliveriesData = csvToJson("../data/deliveries.csv");
const matchesData = csvToJson("../data/matches.csv");

function strikeRateBySeason(playerName) {
  const seasonById = matchesData.reduce((acc, match) => {
    if (!acc[match["season"]]) {
      acc[match["season"]] = [match["id"]];
    } else {
      acc[match["season"]] = [...acc[match["season"]], match["id"]];
    }
    return acc;
  }, {});

  const deliveries = deliveriesData.filter(
    (delivery) => delivery.batsman === playerName
  );
  const totalRunsAndDeliveries = deliveries.reduce((acc, delivery) => {
    let season = "";
    for (let sea in seasonById) {
      if (seasonById[sea].includes(delivery["match_id"])) {
        season = sea;
        break;
      }
    }

    let batsman_runs = parseInt(delivery["batsman_runs"]);

    if (!acc[delivery["batsman"]] || !acc[delivery["batsman"]][season]) {
      acc[delivery["batsman"]] = {
        ...acc[delivery["batsman"]],
        [season]: [batsman_runs, 1],
      };
    } else {
      acc[delivery["batsman"]][season][0] =
        acc[delivery["batsman"]][season][0] + batsman_runs;
      acc[delivery["batsman"]][season][1] += 1;
    }
    return acc;
  }, {});

  let playerTotalRunsAndDeliveries = totalRunsAndDeliveries[playerName];

  for (let season in playerTotalRunsAndDeliveries) {
    let [totalRuns, totalDeliveries] = playerTotalRunsAndDeliveries[season];
    totalRunsAndDeliveries[playerName][season] = Math.floor(
      (totalRuns / totalDeliveries) * 100
    );
  }

  return totalRunsAndDeliveries;
}

outputToJson(
  "../public/output/strike-rate-Byplayer.json",
  strikeRateBySeason("V Kohli")
);

module.exports = strikeRateBySeason;

console.log(strikeRateBySeason("V Kohli"));
