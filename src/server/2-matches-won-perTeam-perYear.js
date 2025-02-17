//Number of matches won per team per year in IPL.

const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");

function getMatchesWonByTeamsEachYear() {
  const result = matchesData.reduce((acc, match) => {
    if (!acc[match["winner"]] || !acc[match["winner"]][match["season"]]) {
      acc[match["winner"]] = { ...acc[match["winner"]], [match["season"]]: 1 };
    } else {
      acc[match["winner"]][match["season"]]++;
    }
    return acc;
  }, {});
  return result;
}

outputToJson(
  "../public/output/matches-won-perTeam.json",
  getMatchesWonByTeamsEachYear()
);

// console.log(getMatchesWonByTeamsEachYear());
