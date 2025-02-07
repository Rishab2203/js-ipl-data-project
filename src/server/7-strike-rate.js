//Find the strike rate of a batsman for each season.

const csvToJson = require("./index.js");

const deliveriesData = csvToJson("../data/deliveries.csv");
const matchesData = csvToJson("../data/matches.csv");

console.log(deliveriesData[0]);

function strikeRateBySeason(playerName) {
  const seasonById = matchesData.reduce((acc, match) => {
    if (!acc[match["season"]]) {
      acc[match["season"]] = [match["id"]];
    } else {
      acc[match["season"]] = [...acc[match["season"]], match["id"]];
    }
    return acc;
  }, {});

  const deliveries = deliveriesData.filter(
    (delivery) => (delivery.batsman = playerName)
  );
  const result = deliveries.reduce((acc, delivery) => {
    let season = "";
    for (let sea in seasonById) {
      if (seasonById[sea].includes(delivery["match_id"])) {
        season = sea;
        break;
      }
    }

    let batsman_runs = parseInt(delivery["batsman_runs"]);

    if (!acc[delivery["batsman"]] || !acc[delivery["batsman"]][season]) {
      acc[delivery["batsman"]] = {
        ...acc[delivery["batsman"]],
        [season]: batsman_runs,
      };
    } else {
      acc[delivery["batsman"]][season] =
        acc[delivery["batsman"]][season] + batsman_runs;
    }
    return acc;
  }, {});
  return result;
}

console.log(strikeRateBySeason("V Kohli"));
