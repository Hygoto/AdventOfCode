const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day09/input'),
    crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
    line = [line.split(" ").map(function (x) {return parseInt(x, 10);})];
    while (!line[line.length-1].every(value => value == line[line.length-1][0])) {
        line.push([]);
        for (let index = 0; index < line[line.length-2].length - 1; index++) {
            line[line.length-1].push(line[line.length-2][index+1] - line[line.length-2][index])
        }
    }
    while (line.length > 1) {
        line[line.length-2].push(line[line.length-2][line[line.length-2].length-1] + line[line.length-1][line[line.length-1].length-1]);
        line.pop();
    }
    sum += line[0][line[0].length-1];
});
rl.on('close', () => console.log(sum));
