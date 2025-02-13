//Find the strike rate of a batsman for each season.
const { csvToJson, outputToJson } = require("./index.js");
const fs = require("fs");

const deliveriesData = csvToJson("../data/deliveries.csv");
const matchesData = csvToJson("../data/matches.csv");

function strikeRateBySeason(playerName) {
  const seasonById = {};

  for (let match of matchesData) {
    let season = match["season"];
    if (!seasonById[season]) {
      seasonById[season] = [];
    }
    seasonById[season].push(match["id"]);
  }

  const deliveries = [];
  for (let delivery of deliveriesData) {
    if (delivery.batsman === playerName) {
      deliveries.push(delivery);
    }
  }

  const totalRunsAndDeliveries = { [playerName]: {} };

  for (let delivery of deliveries) {
    let season = "";
    for (let sea in seasonById) {
      if (seasonById[sea].includes(delivery["match_id"])) {
        season = sea;
        break;
      }
    }

    let batsman_runs = parseInt(delivery["batsman_runs"]);

    if (!totalRunsAndDeliveries[playerName][season]) {
      totalRunsAndDeliveries[playerName][season] = new Array(2).fill(0);
    }

    totalRunsAndDeliveries[playerName][season][0] =
      (totalRunsAndDeliveries[playerName][season][0] || 0) + batsman_runs;

    totalRunsAndDeliveries[playerName][season][1] =
      (totalRunsAndDeliveries[playerName][season][1] || 0) + 1;
  }

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

// console.log(strikeRateBySeason("V Kohli"));
