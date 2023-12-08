const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day08/input'),
    crlfDelay: Infinity,
});

let instructions;
let map = {};
rl.on('line', (line) => {
    if (instructions == undefined) {
        instructions = line.split('');
    }
    else if (line != '') {
        line = line.match(/\w+/g);
        map[line[0]] = [line[1], line[2]];
    }
});
rl.on('close', () => {
    let steps = 0;
    let currentNode = 'AAA';
    let instructionPos = 0;
    while (currentNode != 'ZZZ') {
        if (instructions[instructionPos] == 'R') currentNode = map[currentNode][1];
        else currentNode = map[currentNode][0];
        instructionPos++;
        steps++;
        if (instructionPos >= instructions.length) instructionPos = 0;
    }
    console.log(steps);
});

