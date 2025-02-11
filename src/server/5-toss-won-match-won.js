// Find the number of times each team won the toss and also won the match.
const fs = require("fs");
const csvToJson = require("./index.js");

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

fs.writeFile(
  "../public/output/toss-won-match-won.json",
  JSON.stringify(wonTossWonMatch(), null, 2),
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file created");
  }
);

module.exports = wonTossWonMatch;
// console.log(wonTossWonMatch());
