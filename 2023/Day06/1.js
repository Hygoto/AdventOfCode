const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day06/input'),
    crlfDelay: Infinity,
});

let times = [];
let records = [];
rl.on('line', (line) => {
    if (times.length == 0) times = line.match(/\d+/g);
    else if (records.length == 0) records = line.match(/\d+/g);
});
rl.on('close', () => {
    let errorMargin = 1;
    for (let index = 0; index < times.length; index++) {
        times[index] = parseInt(times[index]);
        records[index] = parseInt(records[index]);
        let velocities = [];
        velocities.push(Math.floor(0.5 * times[index] + Math.sqrt(Math.pow(0.5 * times[index], 2) - records[index])) + 1);
        velocities.push(Math.floor(0.5 * times[index] - Math.sqrt(Math.pow(0.5 * times[index], 2) - records[index])) + 1);
        errorMargin *= velocities[0] - velocities[1];
    }
    console.log(errorMargin);
});
