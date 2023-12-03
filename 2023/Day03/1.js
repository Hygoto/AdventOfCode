const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day03/input'),
  crlfDelay: Infinity,
});

const symbolRegex = /[^\d.]/g;
const numberRegex = /\d+/dg;
let symbolIndices = [];
let previousLine;
let sum = 0;
rl.on('line', (line) => {
  symbolIndices.push([]);
  let match;
  while((match = symbolRegex.exec(line)) != null) {
    symbolIndices[symbolIndices.length-1].push(match.index);
  }
  if (previousLine != undefined) {
    addAdjacent();
  }
  if (symbolIndices.length == 3) symbolIndices.splice(0, 1);
  previousLine = line;
});
rl.on('close', () => {
  addAdjacent();
  console.log(sum);
});

function addAdjacent() {
  let numberIndices = [];
  let match;
  while((match = numberRegex.exec(previousLine)) != null) {
    numberIndices.push([match.indices, match[0], false]);
  }
  symbolIndices.forEach((row) => {
    row.forEach((symbolIndex) => {
      numberIndices.forEach((element) => {
        if ((element[0][0][0] - 1) <= symbolIndex && symbolIndex <= element[0][0][1]) element[2] = true;
      });
    });
  });
  numberIndices.forEach((element) => {
    if (element[2]) sum += parseInt(element[1]);
  });
}
