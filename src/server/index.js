const fs = require("fs");

function csvToJson(path) {
  let data = fs.readFileSync(path).toString();

  let dataArray = data.split(/\r?\n/);
  let [header, ...matches] = dataArray;

  header = header.split(",");

  const arrayOfObj = matches.reduce((acc, curr) => {
    let match = {};
    curr = curr.split(",");
    let i = 0;
    for (let head of header) {
      match[head] = curr[i];
      i++;
    }

    acc.push(match);
    return acc;
  }, []);

  return arrayOfObj;
}

module.exports = csvToJson;
