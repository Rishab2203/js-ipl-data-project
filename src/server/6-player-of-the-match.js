//Find a player who has won the highest number of Player of the Match awards for each season
const csvToJson = require("./index.js");

const matchesData = csvToJson("../data/matches.csv");
const deliveriesData = csvToJson("../data/deliveries.csv");

function getPlayerOfTheMatchBySeason() {
  let result = matchesData.reduce((acc, match) => {
    if (
      !acc[match["season"]] ||
      !acc[match["season"]][match["player_of_match"]]
    ) {
      acc[match["season"]] = {
        ...acc[match["season"]],
        [match["player_of_match"]]: 1,
      };
    } else {
      let newCount = acc[match["season"]][match["player_of_match"]] + 1;
      acc[match["season"]] = {
        ...acc[match["season"]],
        [match["player_of_match"]]: newCount,
      };
    }
    return acc;
  }, {});

  result = Object.entries(result);

  result = result.reduce((acc, season) => {
    let [year, players] = season;
    players = Object.entries(players);
    players.sort((a, b) => b[1] - a[1]);
    acc = { ...acc, [year]: players[0][0] };
    return acc;
  }, {});
  return result;
}

console.log(getPlayerOfTheMatchBySeason());
