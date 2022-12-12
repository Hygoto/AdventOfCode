const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day12/input'),
  crlfDelay: Infinity,
});

let map = [];
let current = [];
let end;
rl.on('line', (line) => {
    let row = [];
    for (let index = 0; index < line.length; index++) {
        if (line.charAt(index) === 'S') {
            current.push([0, map.length, index]);
            row.push(0);
        }
        else if (line.charAt(index) === 'E') {
            end = [map.length, index];
            row.push(25);
        }
        else row.push(line.charCodeAt(index) - 'a'.charCodeAt(0));
    }
    map.push(row);
});
rl.on('close', () => {
    let minSteps = Array(map.length);
    for (let index = 0; index < minSteps.length; index++) {
        minSteps[index] = Array(map[0].length);
        minSteps[index].fill(Infinity);
    }
    minSteps[current[0][1]][current[0][2]] = 0;
    while (current.length > 0) {
        const currentLength = current.length;
        current.forEach(element => {
            if (element[1] + 1 < map.length && map[element[1] + 1][element[2]] - map[element[1]][element[2]] < 2 && element[0] + 1 < minSteps[element[1] + 1][element[2]]) {
                current.push([element[0] + 1, element[1] + 1, element[2]]);
                minSteps[element[1] + 1][element[2]] = element[0] + 1;
            }
            if (element[1] - 1 >= 0 && map[element[1] - 1][element[2]] - map[element[1]][element[2]] < 2 && element[0] + 1 < minSteps[element[1] - 1][element[2]]) {
                current.push([element[0] + 1, element[1] - 1, element[2]]);
                minSteps[element[1] - 1][element[2]] = element[0] + 1;
            }
            if (element[2] + 1 < map[element[1]].length && map[element[1]][element[2] + 1] - map[element[1]][element[2]] < 2 && element[0] + 1 < minSteps[element[1]][element[2] + 1]) {
                current.push([element[0] + 1, element[1], element[2] + 1]);
                minSteps[element[1]][element[2] + 1] = element[0] + 1;
            }
            if (element[2] - 1 >= 0 && map[element[1]][element[2] - 1] - map[element[1]][element[2]] < 2 && element[0] + 1 < minSteps[element[1]][element[2] - 1]) {
                current.push([element[0] + 1, element[1], element[2] - 1]);
                minSteps[element[1]][element[2] - 1] = element[0] + 1;
            }
        });
        current.splice(0, currentLength);
    }
    console.log(minSteps[end[0]][end[1]]);
});
