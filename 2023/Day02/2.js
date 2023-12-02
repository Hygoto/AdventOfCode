const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day02/input'),
  crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
  let red = line.match(/(\d+)(?=\s* red)/g);
  let green = line.match(/(\d+)(?=\s* green)/g);
  let blue = line.match(/(\d+)(?=\s* blue)/g);
  red.sort(compareNumbers);
  green.sort(compareNumbers);
  blue.sort(compareNumbers);
  sum += red[0] * green[0] * blue[0];
});
rl.on('close', () => console.log(sum));

function compareNumbers(a, b) {
  return b - a;
}
