const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day02/input'),
  crlfDelay: Infinity,
});

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
let sum = 0;
rl.on('line', (line) => {
  let red = line.match(/(\d+)(?=\s* red)/g);
  let green = line.match(/(\d+)(?=\s* green)/g);
  let blue = line.match(/(\d+)(?=\s* blue)/g);
  red.sort(compareNumbers);
  green.sort(compareNumbers);
  blue.sort(compareNumbers);
  if (red[0] <= maxRed && green[0] <= maxGreen && blue[0] <= maxBlue) {
    sum += parseInt(line.match(/\d+/g)[0]);
  }
});
rl.on('close', () => console.log(sum));

function compareNumbers(a, b) {
  return b - a;
}
