const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day05/input'),
  crlfDelay: Infinity,
});

let numbers;
let indices = [];
rl.on('line', (line) => {
  let num;
  if (numbers == undefined) {
    numbers = line.match(/\d+/g);
    for (let index = 0; index < numbers.length; index++) {
      numbers[index] = parseInt(numbers[index]);
    }
}
  else if ((num = line.match(/\d+/g)) != null) {
    num[0] = parseInt(num[0]);
    num[1] = parseInt(num[1]);
    num[2] = parseInt(num[2]);
    for (let index = 0; index < numbers.length; index++) {
      if (numbers[index] >= num[1] && numbers[index] <= (num[1] + num[2]) && !(indices.includes(index))) {
        numbers[index] = num[0] + (numbers[index] - num[1]);
        indices.push(index);
      }
    }
  }
  else indices = [];
});
rl.on('close', () => {
  numbers.sort(compareNumbers);
  console.log(numbers[0]);
});

function compareNumbers(a, b) {
  return a - b;
}
