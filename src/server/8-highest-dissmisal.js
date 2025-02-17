//Find the highest number of times one player has been dismissed by another player
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");

function getHighestDismissal() {
  let allDismissalsForBatsman = deliveriesData.reduce((acc, delivery) => {
    if (delivery["batsman"] === delivery["player_dismissed"]) {
      let batsman = delivery["batsman"];
      let bowler = delivery["bowler"];
      if (!acc[batsman]) {
        acc[batsman] = {};
      }
      acc[batsman][bowler] = (acc[batsman][bowler] || 0) + 1;
    }
    return acc;
  }, {});

  allDismissalsForBatsman = Object.entries(allDismissalsForBatsman);
  let result = allDismissalsForBatsman.reduce((acc, player) => {
    let [playerName, bowlers] = player;
    bowlers = Object.entries(bowlers);
    bowlers = bowlers.sort((a, b) => b[1] - a[1]);

    let bestBowler = bowlers[0];
    acc = { ...acc, [playerName]: bestBowler };

    return acc;
  }, {});
  return result;
}

// outputToJson("../public/output/highest-dismissal.json", getHighestDismissal());

module.exports = getHighestDismissal;
console.log(getHighestDismissal());
