const { dir } = require('console');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day14/input'),
    crlfDelay: Infinity,
});

let rocks = [];
rl.on('line', (line) => {
    rocks.push(line.split(''));
});
rl.on('close', () => {
    let pastRocks = new Map();
    pastRocks.set(rocks.toString(), rocks.map((row) => [...row]));
    for (let cycle = 0; cycle < 1000000000; cycle++) {
        tilt([-1, 0]);
        tilt([0, -1]);
        tilt([1, 0]);
        tilt([0, 1]);
        if (pastRocks.has(rocks.toString())) break;
        pastRocks.set(rocks.toString(), rocks.map((row) => [...row]));
    }
    pastRocks = Array.from(pastRocks.values());
    const loopstart = pastRocks.findIndex((element) => element.toString() == rocks.toString());
    const loopPos = (1000000000 - loopstart) % (pastRocks.length - loopstart);
    rocks = pastRocks[loopstart+loopPos];
    let sum = 0;
    for (let y = 0; y < rocks.length; y++) {
        rocks[y] = rocks[y].reduce(count, 0);
        sum += rocks[y] * (rocks.length - y);
    }
    console.log(sum)
});

function tilt(direction) {
    const r = direction.slice(0);
    direction[0] = Math.abs(direction[0]);
    direction[1] = Math.abs(direction[1]);
    if (r[0] > 0) rocks.reverse();
    if (r[1] > 0) {
        for (let index = 0; index < rocks.length; index++) {
            rocks[index].reverse();
        }
    }
    for (let y = 0; y < rocks.length; y++) {
        for (let x = 0; x < rocks[0].length; x++) {
            if (rocks[y][x] == 'O') {
                let distance = 1;
                while (y - (distance * direction[0]) >= 0 && x - (distance * direction[1]) >= 0 && y - (distance * direction[0]) < rocks.length && x - (distance * direction[1]) < rocks[0].length && rocks[y-(distance*direction[0])][x-(distance*direction[1])] == '.') {
                    distance++;
                }
                rocks[y][x] = '.';
                rocks[y-((distance-1) * direction[0])][x-((distance-1) * direction[1])] = 'O';
            }
        }
    }
    if (r[0] > 0) rocks.reverse();
    if (r[1] > 0) {
        for (let index = 0; index < rocks.length; index++) {
            rocks[index].reverse();
        }
    }
}

function count(accumulator, currentValue) {
    if (currentValue == 'O') return accumulator + 1;
    else return accumulator;
}