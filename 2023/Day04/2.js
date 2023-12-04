const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day04/input'),
  crlfDelay: Infinity,
});

let cards = [];
rl.on('line', (line) => {
  let numbers = line.split(/[:|]/);
  numbers[1] = numbers[1].split(/[ ]+/);
  numbers[1].pop();
  numbers[1].splice(0, 1);
  numbers[2] = numbers[2].split(/[ ]+/);
  numbers[2].splice(0, 1);
  numbers[0] = parseInt(numbers[0].substring(5));
  if (cards.length < numbers[0]) cards.push(1);
  let points = 0;
  numbers[1].forEach(element => {
    if (numbers[2].includes(element)) points++;
  });
  for (let index = 0; index < points; index++) {
    if (cards.length <= (numbers[0] + index)) cards.push(cards[numbers[0]-1] + 1);
    else cards[numbers[0] + index] += cards[numbers[0]-1];
  }
});
rl.on('close', () => {
  let sum = 0;
  cards.forEach(element => sum += element);
  console.log(sum);
});
