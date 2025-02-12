// Find the number of times each team won the toss and also won the match.
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");
const deliveriesData = csvToJson("../data/deliveries.csv");

function wonTossWonMatch() {
  const result = matchesData.reduce((acc, match) => {
    if (match.toss_winner === match.winner) {
      acc[match["toss_winner"]] = (acc[match["toss_winner"]] || 0) + 1;
    }
    return acc;
  }, {});
  return result;
}

outputToJson("../public/output/toss-won-match-won.json", wonTossWonMatch);

module.exports = wonTossWonMatch;
// console.log(wonTossWonMatch());
