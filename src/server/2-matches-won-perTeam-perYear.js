//Number of matches won per team per year in IPL.
const fs = require("fs");

const csvToJson = require("./index.js");

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

fs.writeFile(
  "../public/output/matches-won-perTeam.json",
  JSON.stringify(getMatchesWonByTeamsEachYear(), null, 2),
  (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("file created");
  }
);

console.log(getMatchesWonByTeamsEachYear());
