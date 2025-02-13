//Find a player who has won the highest number of Player of the Match awards for each season
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

function getPlayerOfTheMatchBySeason() {
  let playerOfMatchBySeason = {};
  for (let match of matchesData) {
    let season = match["season"];
    let player = match["player_of_match"];
    if (!playerOfMatchBySeason[season]) {
      playerOfMatchBySeason[season] = {};
    }
    playerOfMatchBySeason[season][player] =
      (playerOfMatchBySeason[season][player] || 0) + 1;
  }

  playerOfMatchBySeason = Object.entries(playerOfMatchBySeason);

  let result = {};
  for (let [year, players] of playerOfMatchBySeason) {
    players = Object.entries(players);
    players.sort((a, b) => b[1] - a[1]);
    result = { ...result, [year]: players[0][0] };
  }

  return result;
}

outputToJson(
  "../public/output/player-of-the-match.json",
  getPlayerOfTheMatchBySeason
);

module.exports = getPlayerOfTheMatchBySeason;
// console.log(getPlayerOfTheMatchBySeason());
