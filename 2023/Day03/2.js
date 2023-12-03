const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day03/input'),
  crlfDelay: Infinity,
});

const gearRegex = /(\*)/g;
const numberRegex = /\d+/dg;
let numberIndeces = [];
let previousLine;
let sum = 0;
rl.on('line', (line) => {
  numberIndeces.push([]);
  let match;
  while((match = numberRegex.exec(line)) != null) {
    numberIndeces[numberIndeces.length-1].push([match.indices, match[0]]);
  }
  if (previousLine != undefined) {
    addAdjacent();
  }
  if (numberIndeces.length == 3) numberIndeces.splice(0, 1);
  previousLine = line;
});
rl.on('close', () => {
  addAdjacent();
  console.log(sum);
});

function addAdjacent() {
  let gearIndices = [];
  let match;
  while((match = gearRegex.exec(previousLine)) != null) {
    gearIndices.push([match.index, []]);
  }
  numberIndeces.forEach((row) => {
    row.forEach((numberIndex) => {
      gearIndices.forEach((element) => {
        if ((numberIndex[0][0][0] - 1) <= element[0] && element[0] <= numberIndex[0][0][1]) element[1].push(numberIndex[1]);
      });
    });
  });
  gearIndices.forEach((element) => {
    if (element[1].length == 2) sum += element[1][0] * element[1][1];
  });
}
