const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day10/input'),
  crlfDelay: Infinity,
});

let cycle = 0;
let register = 1;
let sum = 0;
rl.on('line', (line) => {
    const instruction = line.split(' ');
    if (instruction[0] === 'noop') advanceCycle();
    else {
        advanceCycle();
        advanceCycle();
        register += parseInt(instruction[1]);
    }
});

function advanceCycle() {
    cycle++;
    if ((cycle-20)%40 === 0) sum += register * cycle;
}

rl.on('close', () => console.log(sum));
