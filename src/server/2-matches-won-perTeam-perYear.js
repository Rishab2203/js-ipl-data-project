//Number of matches won per team per year in IPL.
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

function getMatchesWonByTeamsEachYear() {
  const result = {};
  for (let match of matchesData) {
    let season = match["season"];
    let teamName = match["winner"];
    if (!result[season]) {
      result[season] = {};
    }
    result[season][teamName] = (result[season][teamName] || 0) + 1;
  }

  return result;
}

outputToJson(
  "../public/output/matches-won-perTeam.json",
  getMatchesWonByTeamsEachYear()
);

// console.log(getMatchesWonByTeamsEachYear());
