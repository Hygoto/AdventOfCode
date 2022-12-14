const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day14/input'),
    crlfDelay: Infinity,
});

let walls = [];
rl.on('line', (line) => {
    line = line.split(' -> ');
    for (let index = 0; index < line.length; index++) {
        line[index] = line[index].split(',');
        line[index] = [parseInt(line[index][0]), parseInt(line[index][1])];
        if (index > 0) {
            if (line[index][0] === line[index-1][0]){
                for (let i = 0; i -Math.sign(line[index-1][1] - line[index][1]) != line[index-1][1] - line[index][1]; i += Math.sign(line[index-1][1] - line[index][1])) {
                    if (!walls.some(compare, [line[index][0], line[index][1] + i])) walls.push([line[index][0], line[index][1] + i]);
                }
            }
            else {
                for (let i = 0; i -Math.sign(line[index-1][0] - line[index][0]) != line[index-1][0] - line[index][0]; i += Math.sign(line[index-1][0] - line[index][0])) {
                    if (!walls.some(compare, [line[index][0] + i, line[index][1]])) walls.push([line[index][0] + i, line[index][1]]);
                }
            }
        }
    }
});
rl.on('close', () => {
    let cave = Array(1000);
    let count = 0;
    let lowest = 0;
    walls.forEach(element => {
        if (element[1] > lowest) lowest = element[1];
    });
    lowest += 2;
    for (let index = 0; index < cave.length; index++) {        
        cave[index] = Array(lowest);
        cave[index].fill(false);
    }
    walls.forEach(element => {
        cave[element[0]][element[1]] = true;
    });
    let sand = [500, 0];
    while (!cave[500][0]) {
        while (!cave[500][0]) {
            if (sand[1]+1 < lowest && !cave[sand[0]][sand[1]+1]) sand[1]++;
            else if (sand[1]+1 < lowest && !cave[sand[0]-1][sand[1]+1]) {
                sand[0]--;
                sand[1]++;
            }
            else if (sand[1]+1 < lowest && !cave[sand[0]+1][sand[1]+1]) {
                sand[0]++;
                sand[1]++;
            }
            else {
                cave[sand[0]][sand[1]] = true;
                count++;
                sand = [500, 0];
                break;
            }
        }
    }
    console.log(count);
});

function compare(array) {
    if (this[0] === array[0] && this[1] === array[1]) return true;
    else return false;
}
