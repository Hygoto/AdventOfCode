const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day10/input'),
  crlfDelay: Infinity,
});

let cycle = 0;
let sprite = 1;
let row = '';
rl.on('line', (line) => {
    const instruction = line.split(' ');
    if (instruction[0] === 'noop') advanceCycle();
    else {
        advanceCycle();
        advanceCycle();
        sprite += parseInt(instruction[1]);
    }
});

function advanceCycle() {
    cycle++;
    if (Math.abs(((cycle-1)%40)-sprite) > 1) row += ' ';
    else row += '█';
    if (cycle%40 === 0) {
        console.log(row);
        row = '';
    }
}
