const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day04/input'),
  crlfDelay: Infinity,
});

let pairs = 0;
rl.on('line', (line) => {
  let sections = line.split(/[-,]+/);
  if (Math.sign(sections[0] - sections[2]) != Math.sign(sections[1] - sections[3] || (sections[0] - sections[2] === 0 && sections[1] - sections[3] === 0))) pairs++;
});
rl.on('close', () => console.log(pairs));
