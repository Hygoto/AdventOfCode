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
    let currentNodes = [];
    let instructionPos = 0;
    let loopLengths = [];
    Object.keys(map).forEach(element => {
        if (element.charAt(element.length - 1) == 'A') currentNodes.push(element);
    });
    while (currentNodes.length > 0) {
        if (instructions[instructionPos] == 'R') navigate(currentNodes, 1);
        else navigate(currentNodes, 0);
        instructionPos++;
        steps++;
        if (instructionPos >= instructions.length) instructionPos = 0;
        for (let index = 0; index < currentNodes.length; index++) {
            if (currentNodes[index].charAt(currentNodes[index].length - 1) == 'Z') {
                loopLengths.push(steps);
                currentNodes.splice(index, 1);
            }            
        }
    }
    while (loopLengths.length > 1) {
        loopLengths[0] = loopLengths[0] / gcd(loopLengths[0], loopLengths[1]) * loopLengths[1];
        loopLengths.splice(1, 1);
    }
    console.log(loopLengths[0]);
});

function navigate(currentNodes, direction) {
    for (let index = 0; index < currentNodes.length; index++) {
        currentNodes[index] = map[currentNodes[index]][direction];
    }
}

function gcd(a, b) {
    let t;
    while (b != 0) {
        t = b;
        b = a % b;
        a = t;
    }
    return a;
}