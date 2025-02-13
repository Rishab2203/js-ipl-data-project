//Find the bowler with the best economy in super overs
const fs = require("fs");
const { csvToJson, outputToJson } = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");

function getTopEconomicBowlersInSuperOver() {
  const superOverDeliveries = [];

  for (let delivery of deliveriesData) {
    if (delivery["is_super_over"] == "1") {
      superOverDeliveries.push(delivery);
    }
  }

  const runsAndDeliveries = {};

  for (let delivery of superOverDeliveries) {
    let bowler = delivery["bowler"];
    let runs = parseInt(delivery["batsman_runs"]);

    if (!runsAndDeliveries[bowler]) {
      runsAndDeliveries[bowler] = {};
    }
    runsAndDeliveries[bowler]["total_runs_given"] =
      (runsAndDeliveries[bowler]["total_runs_given"] || 0) + runs;
    runsAndDeliveries[bowler]["total_deliveries"] =
      (runsAndDeliveries[bowler]["total_deliveries"] || 0) + 1;
  }

  // const runsAndDeliveries = superOverDeliveries.reduce((acc, delivery) => {
  //   let runs = parseInt(delivery["batsman_runs"]);
  //   if (!acc[delivery["bowler"]]) {
  //     acc[delivery["bowler"]] = { total_runs_given: runs, total_deliveries: 1 };
  //   } else {
  //     acc[delivery["bowler"]]["total_runs_given"] += runs;
  //     acc[delivery["bowler"]]["total_deliveries"]++;
  //   }
  //   return acc;
  // }, {});

  const totalRunsAndDeliveries = Object.entries(runsAndDeliveries);
  let economies = {};
  for (let [bowler_name, runs_deliveries] of totalRunsAndDeliveries) {
    let economy =
      runs_deliveries["total_runs_given"] / runs_deliveries["total_deliveries"];
    economies[bowler_name] = economy;
  }

  economies = Object.entries(economies).sort((a, b) => a[1] - b[1]);
  return economies.slice(0, 11);
}

outputToJson(
  "../public/output/superover-economy.json",
  getTopEconomicBowlersInSuperOver
);

module.exports = getTopEconomicBowlersInSuperOver;
// console.log(getTopEconomicBowlersInSuperOver());
