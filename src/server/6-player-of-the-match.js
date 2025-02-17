//Find a player who has won the highest number of Player of the Match awards for each season
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

function getPlayerOfTheMatchBySeason() {
  let allPlayerOfMatchByYear = matchesData.reduce((acc, match) => {
    let season = match["season"];
    let player = match["player_of_match"];

    if (!acc[season]) {
      acc[season] = {};
    }
    acc[season][player] = (acc[season][player] || 0) + 1;

    return acc;
  }, {});

  allPlayerOfMatchByYear = Object.entries(allPlayerOfMatchByYear);

  let result = allPlayerOfMatchByYear.reduce((acc, season) => {
    let [year, players] = season;
    players = Object.entries(players);
    players.sort((a, b) => b[1] - a[1]);
    acc = { ...acc, [year]: players[0][0] };
    return acc;
  }, {});
  return result;
}

outputToJson(
  "../public/output/player-of-the-match.json",
  getPlayerOfTheMatchBySeason()
);

module.exports = getPlayerOfTheMatchBySeason;
// console.log(getPlayerOfTheMatchBySeason());
