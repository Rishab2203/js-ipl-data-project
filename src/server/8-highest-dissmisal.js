//Find the highest number of times one player has been dismissed by another player
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");

function getHighestDismissal() {
  let allBowlersAndAllBattersCombination = {};
  for (let delivery of deliveriesData) {
    let batsman = delivery["batsman"];
    let bowler = delivery["bowler"];
    let dismissedPlayer = delivery["player_dismissed"];
    if (batsman === dismissedPlayer) {
      if (!allBowlersAndAllBattersCombination[batsman]) {
        allBowlersAndAllBattersCombination[batsman] = {};
      }
      allBowlersAndAllBattersCombination[batsman][bowler] =
        (allBowlersAndAllBattersCombination[batsman][bowler] || 0) + 1;
    }
  }

  let entries = Object.entries(allBowlersAndAllBattersCombination);

  let result = {};

  for (let [playerName, bowlers] of entries) {
    bowlers = Object.entries(bowlers);
    bowlers = bowlers.sort((a, b) => b[1] - a[1]);

    let bestBowler = bowlers[0];
    result = { ...result, [playerName]: bestBowler };
  }
  return result;
}

outputToJson("../public/output/highest-dismissal.json", getHighestDismissal());

module.exports = getHighestDismissal;
// console.log(getHighestDismissal());
