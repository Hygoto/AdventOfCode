const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day16/input'),
    crlfDelay: Infinity,
});

let contraption = [];
rl.on('line', (line) => {
    contraption.push(line.split(''));
});
rl.on('close', () => {
    let maxEnergized = 0;
    for (let p = 0; p < contraption.length; p++) {
        let energized = Array(contraption.length);
        energized = fill2d(energized);
        beam(energized, 2, [p, 0]);
        let e = energized.reduce(sumEnergized, 0);
        if (e > maxEnergized) maxEnergized = e;
        energized = fill2d(energized);
        beam(energized, -2, [p, contraption[0].length-1]);
        e = energized.reduce(sumEnergized, 0);
        if (e > maxEnergized) maxEnergized = e;
    }
    for (let p = 0; p < contraption[0].length; p++) {
        let energized = Array(contraption.length);
        energized = fill2d(energized);
        beam(energized, 1, [0, p]);
        let e = energized.reduce(sumEnergized, 0);
        if (e > maxEnergized) maxEnergized = e;
        energized = fill2d(energized);
        beam(energized, -1, [contraption.length-1, p]);
        e = energized.reduce(sumEnergized, 0);
        if (e > maxEnergized) maxEnergized = e;
    }
    console.log(maxEnergized);
});

function beam(energized, direction, position) {
    if (position[0] < 0 || position[1] < 0 || position[0] >= contraption.length || position[1] >= contraption[0].length) return;
    if (energized[position[0]][position[1]] == 3) return;
    if (Math.abs(direction) == energized[position[0]][position[1]] && contraption[position[0]][position[1]] != '/' && contraption[position[0]][position[1]] != '\\') return;
    if (contraption[position[0]][position[1]] == '/' && Math.sign(direction) == Math.sign(energized[position[0]][position[1]]-1.5) && energized[position[0]][position[1]] != 0) return;
    else if (contraption[position[0]][position[1]] == '\\' && (((direction == -1 || direction == 2) && energized[position[0]][position[1]] == 2) || ((direction == 1 || direction == -2) && energized[position[0]][position[1]] == 1))) return;
    if (contraption[position[0]][position[1]] == '.' || (contraption[position[0]][position[1]] == '-' && Math.abs(direction) == 2) || (contraption[position[0]][position[1]] == '|' && Math.abs(direction) == 1)) {
        energized[position[0]][position[1]] += Math.abs(direction);
        beam(energized, direction, [position[0]+(direction%2), position[1]+Math.sign(direction)*Math.floor(Math.abs(direction)/2)]);
    }
    else if (contraption[position[0]][position[1]] == '-') {
        energized[position[0]][position[1]] = 3;
        beam(energized, 2, [position[0], position[1]+1]);
        beam(energized, -2, [position[0], position[1]-1]);
    }
    else if (contraption[position[0]][position[1]] == '|') {
        energized[position[0]][position[1]] = 3;
        beam(energized, 1, [position[0]+1, position[1]]);
        beam(energized, -1, [position[0]-1, position[1]]);
    }
    else if (contraption[position[0]][position[1]] == '/') {
        if (Math.sign(direction) == 1) energized[position[0]][position[1]] += 2;
        else energized[position[0]][position[1]] += 1;
        beam(energized, -1*(direction*2%3), [position[0]+(-1*(direction*2%3)%2), position[1]+Math.sign(direction)*Math.floor((Math.abs(direction)*2%3)/2)*-1]);
    }
    else {
        if (direction == -1 || direction == 2) energized[position[0]][position[1]] += 2;
        else energized[position[0]][position[1]] += 1;
        beam(energized, 1*(direction*2%3), [position[0]+(1*(direction*2%3)%2), position[1]+Math.sign(direction)*Math.floor((Math.abs(direction)*2%3)/2)]);
    }
}
function sumEnergized(accumulator, currentValue) {
    return accumulator + currentValue.reduce(countEnergized, 0);
}
function countEnergized(accumulator, currentValue) {
    if (currentValue > 0) return accumulator + 1;
    else return accumulator;
}
function fill2d(arr) {
    for (let index = 0; index < contraption.length; index++) {
        arr[index] = Array(contraption[index].length).fill(0);
    }
    return arr;
}