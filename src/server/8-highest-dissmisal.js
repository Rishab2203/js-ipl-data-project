//Find the highest number of times one player has been dismissed by another player
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");

function getHighestDismissal() {
  let result = deliveriesData.reduce((acc, delivery) => {
    if (delivery["batsman"] === delivery["player_dismissed"]) {
      if (
        !acc[delivery["batsman"]] ||
        !acc[delivery["batsman"]][delivery["bowler"]]
      ) {
        acc[delivery["batsman"]] = {
          ...acc[delivery["batsman"]],
          [delivery["bowler"]]: 1,
        };
      } else {
        acc[delivery["batsman"]][delivery["bowler"]] += 1;
      }
    }
    return acc;
  }, {});

  result = Object.entries(result);
  result = result.reduce((acc, player) => {
    let [playerName, bowlers] = player;
    bowlers = Object.entries(bowlers);
    bowlers = bowlers.sort((a, b) => b[1] - a[1]);

    let bestBowler = bowlers[0];
    acc = { ...acc, [playerName]: bestBowler };

    return acc;
  }, {});
  return result;
}

outputToJson("../public/output/highest-dismissal.json", getHighestDismissal);

module.exports = getHighestDismissal;
// console.log(getHighestDismissal());
