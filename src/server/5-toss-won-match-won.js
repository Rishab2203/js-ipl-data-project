// Find the number of times each team won the toss and also won the match.
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");
const deliveriesData = csvToJson("../data/deliveries.csv");

function wonTossWonMatch() {
  const result = {};

  for (let match of matchesData) {
    if (match.toss_winner === match.winner) {
      result[match["toss_winner"]] = (result[match["toss_winner"]] || 0) + 1;
    }
  }

  return result;
}

outputToJson("../public/output/toss-won-match-won.json", wonTossWonMatch());

module.exports = wonTossWonMatch;
// console.log(wonTossWonMatch());
