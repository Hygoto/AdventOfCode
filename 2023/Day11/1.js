const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day11/input'),
    crlfDelay: Infinity,
});

let map = [];
rl.on('line', (line) => {
    if (!line.includes('#')) map.push(line.split(''));
    map.push(line.split(''));
});
rl.on('close', () => {
    for (let index = 0; index < map[0].length; index++) {
        let galaxy = false;
        map.forEach(element => {
            if (element[index] == '#') galaxy = true;
        });
        if (!galaxy) {
            for (let index1 = 0; index1 < map.length; index1++) {
                map[index1].splice(index, 0, '.');
            }
            index++;
        }
    }
    let galaxies = [];
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] == '#') galaxies.push([x, y]);
        }
    }
    let sum = 0;
    for (let index = 0; index < galaxies.length; index++) {
        for (let index1 = index; index1 < galaxies.length; index1++) {
            sum += Math.abs(galaxies[index][0] - galaxies[index1][0]) + Math.abs(galaxies[index][1] - galaxies[index1][1]);
        }
    }
    console.log(sum);
});

