const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day06/input'),
  crlfDelay: Infinity,
});

let time = [];
let record = [];
rl.on('line', (line) => {
  if (time.length == 0) time = line.match(/\d+/g);
  else if (record.length == 0) record = line.match(/\d+/g);
});
rl.on('close', () => {
  time = parseInt(time.join(''));
  record = parseInt(record.join(''));
  time = parseInt(time);
  record = parseInt(record);
  let velocities = [];
  velocities.push(Math.floor(0.5 * time + Math.sqrt(Math.pow(0.5 * time, 2) - record)) + 1);
  velocities.push(Math.floor(0.5 * time - Math.sqrt(Math.pow(0.5 * time, 2) - record)) + 1);
  console.log(velocities[0] - velocities[1]);
});
