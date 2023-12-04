const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day04/input'),
  crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
  let numbers = line.split(/[:|]/);
  numbers[1] = numbers[1].split(/[ ]+/);
  numbers[1].pop();
  numbers[1].splice(0, 1);
  numbers[2] = numbers[2].split(/[ ]+/);
  numbers[2].splice(0, 1);
  let points = 0.5;
  numbers[1].forEach(element => {
    if (numbers[2].includes(element)) points *= 2;
  });
  sum += Math.floor(points);
});
rl.on('close', () => console.log(sum));
